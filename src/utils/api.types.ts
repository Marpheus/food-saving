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

// PRICES

export interface Price {
    productId: number;
    price: Price;
    pricePerUnit: Price;
    sales: Sale[];
}

export interface Price {
    amount: number;
    currency: Currency;
}

export enum Currency {
    Czk = "CZK",
}

export interface Sale {
    id: number;
    type: SaleType;
    triggerAmount: number;
    price: Price;
    pricePerUnit: Price;
    badges: PriceBadge[];
    validTill: Date;
    active: boolean;
}

export interface PriceBadge {
    type: BadgeType;
    title: string;
    subtitle: null;
    tooltip: null;
}

export enum BadgeType {
    BestBefore = "best-before",
    Discount = "discount",
    PremiumDiscount = "premium-discount",
}

export enum SaleType {
    Expiration = "expiration",
    Premium = "premium",
}

// STOCK

export interface Stock {
    productId: number;
    warehouseId: number;
    unavailabilityReason: UnavailabilityReason | null;
    packageInfo: PackageInfo;
    preorderEnabled: boolean;
    maxBasketAmount: number;
    maxBasketAmountReason: MaxBasketAmountReason;
    deliveryRestriction: null;
    expectedReplenishment: null;
    availabilityDimension: number;
    shelfLife: ShelfLife;
    billablePackaging: null;
    tooltips: any[];
    sales: Sale[];
    inStock: boolean;
}

export enum MaxBasketAmountReason {
    Allowed = "ALLOWED",
    Available = "AVAILABLE",
}

export interface PackageInfo {
    amount: number;
    unit: Unit;
}

export interface Sale {
    id: number;
    amount: number;
    unlimitedAmount: boolean;
    shelfLife: ShelfLife;
}

export interface ShelfLife {
    type: Type;
    average: number | null;
    minimal: number | null;
    bestBefore: Date | null;
}

export enum Type {
    BestBefore = "bestBefore",
    Standard = "standard",
}

export enum UnavailabilityReason {
    VyprodánoOčekávámeVPondělí = "Vyprodáno. Očekáváme v pondělí.",
    VyprodánoOčekávámeVeStředu = "Vyprodáno. Očekáváme ve středu.",
    VyprodánoOčekávámeVÚterý = "Vyprodáno. Očekáváme v úterý.",
}