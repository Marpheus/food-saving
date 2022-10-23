import {NextApiRequest, NextApiResponse} from "next";

export interface Products {
    categoryId: number;
    categoryType: string;
    productIds: number[];
    impressions: any[];
    pageable: Pageable;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

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

        const lastMinuteProducts: Products = await lastMinuteProductsResponse.json()

        const productIds = lastMinuteProducts.productIds

        // https://www.rohlik.cz/api/v1/products?products=1397320&products=1411928&products=1368347&products=1404643&products=1353987&products=1353717&products=1382145&products=1397764&products=1353747&products=1408459        // z tohto zobrazujem premiumOnly a name
        // beriem aj id a slug a konstruujem url

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
        res.json({lastMinuteProducts});
    } catch (e) {
        res.status(400).json({error: (e as Error).message});
    }
};