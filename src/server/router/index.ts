// src/server/router/index.ts
import {createRouter} from "./context";
import superjson from "superjson";
import {protectedExampleRouter} from "./protected-example-router";
import {foodRouter} from "@/server/router/food";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge("food.", foodRouter)
    .merge("auth.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
