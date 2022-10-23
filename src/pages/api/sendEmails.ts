import {NextApiRequest, NextApiResponse} from "next";
import {LastMinuteProducts, Price, Product, Stock} from "@/utils/api.types";
import users from "data/users.json";
import fs from "fs";
import * as handlebars from "handlebars";
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: 'smtp.seznam.cz',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const addProductsToUrl = (productIds: number[], url: string): string => {
    productIds.forEach((id, index) => {
        url += 'products=' + id
        if (index !== productIds.length - 1) {
            url += '&'
        }
    })
    return url
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const lastMinuteProductsEndpoint = 'https://www.rohlik.cz/api/v1/categories/last-minute/300103000/products'

        // TODO dynamic PHP SESSION
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'PHPSESSION=Wm8N9BYHZH3hxC303kmblZpWtIFVPEP5;'
            },
        }

        const lastMinuteProductsResponse = await fetch(lastMinuteProductsEndpoint, options)

        const lastMinuteProducts: LastMinuteProducts = await lastMinuteProductsResponse.json()

        const productIds = lastMinuteProducts.productIds

        if (!productIds) {
            return
        }
        const productsEndpoint = addProductsToUrl(productIds, 'https://www.rohlik.cz/api/v1/products?')

        // https://www.rohlik.cz/api/v1/products?products=1397320&products=1411928&products=1368347&products=1404643&products=1353987&products=1353717&products=1382145&products=1397764&products=1353747&products=1408459        // z tohto zobrazujem premiumOnly a name
        // beriem aj id a slug a konstruujem url
        const productsResponse = await fetch(productsEndpoint, options)

        const products: Product[] = await productsResponse.json()

        if (!products) {
            return
        }

        const finalProducts: any[] = []
        products.forEach((product) => {
            finalProducts.push({
                id: product.id,
                name: product.name,
                url: 'https://www.rohlik.cz/' + product.id + '-' + product.slug
            })
        })

        const pricesEndpoint = addProductsToUrl(productIds, 'https://www.rohlik.cz/api/v1/products/prices?')
        const pricesResponse = await fetch(pricesEndpoint, options)

        const prices: Price[] = await pricesResponse.json()

        if (!prices) {
            return
        }
        // https://www.rohlik.cz/api/v1/products/prices?products=1397320&products=1411928&products=1368347&products=1404643&products=1353987&products=1353717&products=1382145&products=1397764&products=1353747&products=1408459
        // price.amount je gramaz
        // sales[0].price.amount je cena
        // pricePerUnit.amount je povodna cena za kilo
        // sales[0].pricePerAmount.amount je nova cena za kilo
        // sales[0].badges je pole a tam title
        // zlavu spocitame trojclenkou

        prices.forEach((price) => {
            const product = finalProducts.find(p => p.id === price.productId)
            const productIndex = finalProducts.findIndex(p => p.id === price.productId)

            const oldPrice = price.price.amount || 0
            const newPrice = price.sales[0]?.price.amount || 0

            finalProducts[productIndex] = {
                ...product,
                weight: price.amount,
                price: price.sales[0]?.price.amount,
                salePercent: 100 - Math.round(newPrice * 100 / oldPrice),
                badges: price.sales.map(s => s.badges.map(b => b.title))
            }
        })

        // https://www.rohlik.cz/api/v1/products/stock?products=1397320&products=1411928&products=1368347&products=1404643&products=1353987&products=1353717&products=1382145&products=1397764&products=1353747&products=1408459
        // mnozstvo vieme teoreticky z packageInfo.amount a packageInfo.unit
        // maxBasketAmount

        const stockEndpoint = addProductsToUrl(productIds, 'https://www.rohlik.cz/api/v1/products/stock?')
        const stockResponse = await fetch(stockEndpoint, options)

        const stocks: Stock[] = await stockResponse.json()

        if (!stocks) {
            return
        }

        stocks.forEach((stock) => {
            const product = finalProducts.find(p => p.id === stock.productId)
            const productIndex = finalProducts.findIndex(p => p.id === stock.productId)

            finalProducts[productIndex] = {
                ...product,
                weightFromStock: stock.packageInfo.amount + ' ' + stock.packageInfo.unit,
                inStock: stock.inStock,
                maxBasketAmount: stock.maxBasketAmount
            }
        })

        const compare = (a: any, b: any) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        }

        const filteredByPercent = finalProducts.filter(p => p.salePercent >= 40).sort(compare)
        // Vyfiltruju produkty se slevou (aktualne 40%+)
        // Pokud tam nic neni, tak koncim
        // Pro kazdy produkt vypisu
        // productName
        // sales.discountPercentage
        // sales.priceForUnit.whole
        // sales.remaining
        const payload = JSON.stringify(filteredByPercent)

        type User = {
            email: string,
            payload?: string
        }
        const newUsers: User[] = []
        users.forEach((u: User) => {
            if (u.payload !== payload) {
                newUsers.push({
                    ...u,
                    payload
                })

                const content = filteredByPercent.map(p => {
                    let c = '<h4>' + p.name + '</h4>'
                    c += '<p>URL: ' + p.url + '</p>'
                    c += '<p>Cena: ' + p.price + ' CZK</p>'
                    c += '<p>Zľava: ' + p.salePercent + ' %</p>'
                    c += '<p>Hmotnosť: ' + p.weightFromStock + '</p>'
                    c += '<p>Info: ' + p.badges + '</p>'
                    c += '<p>Max kusov: ' + p.maxBasketAmount + '</p>'
                    c += '<hr>'
                    return c
                })

                const source = `<!DOCTYPE HTML>

<html lang="cs">

<head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta content="width=device-width" name="viewport"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta content="IE=edge" http-equiv="X-UA-Compatible"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title>{{gameName}}</title>

    <!-- CSS Reset : BEGIN -->
    <style>

        /* What it does: Remove spaces around the email design added by some email clients. */
        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
        }

        /* What it does: Stops email clients resizing small text. */
        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        /* What it does: Centers email on Android 4.4 */
        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }

        /* What it does: Stops Outlook from adding extra spacing to tables. */
        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        /* What it does: Fixes webkit padding issue. */
        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }

        /* What it does: Uses a better rendering method when resizing images in IE. */
        img {
            -ms-interpolation-mode: bicubic;
        }

        /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
        a {
            text-decoration: none;
            color: #23ab70 !important;
        }

        /* What it does: A work-around for email clients meddling in triggered links. */
        *[x-apple-data-detectors], /* iOS */
        .unstyle-auto-detected-links *,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
        .a6S {
            display: none !important;
            opacity: 0.01 !important;
        }

        /* What it does: Prevents Gmail from changing the text color in conversation threads. */
        .im {
            color: inherit !important;
        }

        /* If the above doesn't work, add a .g-img class to any image in question. */
        img.g-img + div {
            display: none !important;
        }

        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
        /* Create one of these media queries for each additional viewport size you'd like to fix */

        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            u ~ div .email-container {
                min-width: 320px !important;
            }
        }

        /* iPhone 6, 6S, 7, 8, and X */
        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            u ~ div .email-container {
                min-width: 375px !important;
            }
        }

        /* iPhone 6+, 7+, and 8+ */
        @media only screen and (min-device-width: 414px) {
            u ~ div .email-container {
                min-width: 414px !important;
            }
        }

        p {
            color: #000000 !important;
        }

    </style>

    <!-- CSS Reset : END -->
</head>

<body>
<h2>Novinky z Rohliku</h2>
{{{content}}}
</body>

</html>`;
                const template = handlebars.compile(source)
                const htmlToSend = template({content});

                transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: u.email,
                    subject: 'Rohlik Zachran Jidlo',
                    html: htmlToSend,
                }, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent for email ' + u.email + '.');
                    }
                });
            } else {
                newUsers.push({
                    ...u
                })
            }
        })
        fs.writeFileSync('data/users.json', JSON.stringify(newUsers, null, 4));

        res.json({prices});
    } catch (e) {
        res.status(400).json({error: (e as Error).message});
    }
};