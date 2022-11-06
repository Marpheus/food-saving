import UserModel from "@/models/user.model";

export const getDefaultUserConfig = (email: string) => {

    const DEFAULT_THRESHOLD = 40
    const DEFAULT_ENABLED = true
    return new UserModel({
        email,
        config: {
            meatFish: {
                id: '300103000',
                threshold: DEFAULT_THRESHOLD,
                enabled: DEFAULT_ENABLED,
            },
            bistro: {
                id: '300117732',
                threshold: DEFAULT_THRESHOLD,
                enabled: DEFAULT_ENABLED,
            },
            plantBased: {
                id: '300121429',
                threshold: DEFAULT_THRESHOLD,
                enabled: DEFAULT_ENABLED,
            },
            bakery: {
                id: '300101000',
                threshold: DEFAULT_THRESHOLD,
                enabled: DEFAULT_ENABLED,
            },
            fruitVegetables: {
                id: '300102000',
                threshold: DEFAULT_THRESHOLD,
                enabled: DEFAULT_ENABLED,
            },
            sausages: {
                id: '300104000',
                threshold: DEFAULT_THRESHOLD,
                enabled: DEFAULT_ENABLED,
            },
            dairy: {
                id: '300105000',
                threshold: DEFAULT_THRESHOLD,
                enabled: DEFAULT_ENABLED,
            },
            durable: {
                id: '300106000',
                threshold: DEFAULT_THRESHOLD,
                enabled: DEFAULT_ENABLED,
            },
            drinks: {
                id: '300108000',
                threshold: DEFAULT_THRESHOLD,
                enabled: DEFAULT_ENABLED,
            },
            special: {
                id: '300112393',
                threshold: DEFAULT_THRESHOLD,
                enabled: DEFAULT_ENABLED,
            },
            cosmetics: {
                id: '300109000',
                threshold: DEFAULT_THRESHOLD,
                enabled: DEFAULT_ENABLED,
            },
            children: {
                id: '300110000',
                threshold: DEFAULT_THRESHOLD,
                enabled: DEFAULT_ENABLED,
            },
            otocObal: {
                id: '300114741',
                threshold: DEFAULT_THRESHOLD,
                enabled: DEFAULT_ENABLED,
            },
        },
        dataSent: []
    })
}