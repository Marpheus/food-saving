import {z} from "zod";
import {createRouter} from "./context";
import users from "data/users.json";
import fs from "fs";

function saveData(users: any) {
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));
}

const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const foodRouter = createRouter()
    .mutation("subscribe", {
        input: z.object({
            email: z.string(),
        }),
        async resolve({input}) {

            const isEmail = validateEmail(input.email)
            if (!isEmail) {
                return {success: true}
            }
            const user = {
                email: input.email
            }

            // @ts-expect-error TODO
            if (!users.find((u) => u.email === user.email)) {
                // @ts-expect-error TODO
                users.push(user)
                saveData(users)
            }
            return {success: true};
        },
    })
    .mutation("unsubscribe", {
        input: z.object({
            email: z.string(),
        }),
        async resolve({input}) {

            const isEmail = validateEmail(input.email)
            if (!isEmail) {
                return {success: true}
            }
            
            // @ts-expect-error TODO
            const newUsers = users.filter(x => x.email.toString() !== input.email.toString());
            saveData(newUsers);

            return {success: true};
        },
    });

// export type definition of API
export type FoodRouter = typeof foodRouter;
