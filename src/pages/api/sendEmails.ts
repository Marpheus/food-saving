import {NextApiRequest, NextApiResponse} from "next";
import {LastMinuteProducts, Product} from "@/utils/api.types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const lastMinuteProductsEndpoint = 'https://www.rohlik.cz/api/v1/categories/last-minute/300103000/products'

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const lastMinuteProductsResponse = await fetch(lastMinuteProductsEndpoint, options)

        const lastMinuteProducts: LastMinuteProducts = await lastMinuteProductsResponse.json()

        const productIds = lastMinuteProducts.productIds

        if (!productIds) {
            return
        }
        let productsEndpoint = 'https://www.rohlik.cz/api/v1/products?'

        productIds.forEach((id, index) => {
            productsEndpoint += 'products=' + id
            if (index !== productIds.length - 1) {
                productsEndpoint += '&'
            }
        })

        // https://www.rohlik.cz/api/v1/products?products=1397320&products=1411928&products=1368347&products=1404643&products=1353987&products=1353717&products=1382145&products=1397764&products=1353747&products=1408459        // z tohto zobrazujem premiumOnly a name
        // beriem aj id a slug a konstruujem url
        const productsResponse = await fetch(productsEndpoint, options)

        const products: Product[] = await productsResponse.json()

        const finalProducts: any[] = []
        products.forEach((product) => {
            finalProducts.push({
                id: product.id,
                name: product.name,
                url: 'https://www.rohlik.cz/' + product.id + '-' + product.slug
            })
        })

        console.log(finalProducts)
        console.log(finalProducts.length)

        // https://www.rohlik.cz/api/v1/products/prices?products=1397320&products=1411928&products=1368347&products=1404643&products=1353987&products=1353717&products=1382145&products=1397764&products=1353747&products=1408459
        // price.amount je gramaz
        // sales[0].price.amount je cena
        // pricePerUnit.amount je povodna cena za kilo
        // sales[0].pricePerAmount.amount je nova cena za kilo
        // sales[0].badges je pole a tam title
        // zlavu spocitame trojclenkou

        // https://www.rohlik.cz/api/v1/products/stock?products=1397320&products=1411928&products=1368347&products=1404643&products=1353987&products=1353717&products=1382145&products=1397764&products=1353747&products=1408459
        // mnozstvo vieme teoreticky z packageInfo.amount a packageInfo.unit
        // maxBasketAmount

        // Vyfiltruju produkty se slevou (aktualne 40%+)
        // Pokud tam nic neni, tak koncim
        // Pro kazdy produkt vypisu
        // productName
        // sales.discountPercentage
        // sales.priceForUnit.whole
        // sales.remaining
        res.json({products});
    } catch (e) {
        res.status(400).json({error: (e as Error).message});
    }
};