import {z} from "zod";
import {createRouter} from "./context";

export const foodRouter = createRouter()
    .mutation("subscribe", {
        input: z.object({
            email: z.string(),
        }),
        async resolve({input}) {
            // TODO
            return {success: true};
        },
    })
    .mutation("unsubscribe", {
        input: z.object({
            email: z.string(),
        }),
        async resolve({input}) {
            // TODO
            return {success: true};
        },
    });

// export type definition of API
export type FoodRouter = typeof foodRouter;
