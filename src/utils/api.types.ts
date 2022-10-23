// LAST MINUTE

export interface LastMinuteProducts {
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

// PRODUCTS

export interface Product {
    id: number;
    name: string;
    slug: string;
    mainCategoryId: number;
    unit: Unit;
    textualAmount: string;
    badges: Badge[];
    archived: boolean;
    premiumOnly: boolean;
    brand: null | string;
    images: string[];
    countries: Country[];
    canBeFavorite: boolean;
    information: any[];
    weightedItem: boolean;
    packageRatio: null;
    sellerId: number;
    flag: Flag | null;
    attachments: any[];
}

export interface Badge {
    type: Type;
    title: Title;
    subtitle: null;
    tooltip: string;
}

export enum Title {
    Bio = "BIO",
    DenníKontrolaCen = "Denní kontrola cen",
    ExkluzivněProPremium = "Exkluzivně pro Premium",
    OdČeskéhoFarmáře = "Od českého farmáře",
    PrémiováKvalita = "Prémiová kvalita",
    VyzráléMaso = "Vyzrálé maso",
}

export enum Type {
    BestBuy = "best-buy",
    Bio = "bio",
    FarmerProduct = "farmer-product",
    MaturedMeat = "matured-meat",
    PremiumOnlyProduct = "premium-only-product",
    PremiumProduct = "premium-product",
}

export interface Country {
    name: string;
    nameId: string;
    code: string;
}

export enum Flag {
    Cz = "cz",
}

export enum Unit {
    Kg = "kg",
}