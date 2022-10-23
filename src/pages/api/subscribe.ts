import {NextApiRequest, NextApiResponse} from "next";
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            res.status(405).send({message: 'Only POST requests allowed'})
            return
        }

        const isEmail = validateEmail(req.body.email)
        if (!isEmail) {
            return {success: false}
        }
        const user = {
            email: req.body.email
        }

        // @ts-expect-error TODO
        if (!users.find((u) => u.email === user.email)) {
            // @ts-expect-error TODO
            users.push(user)
            saveData(users)
        }

        res.json({users});
    } catch (e) {
        res.status(400).json({error: (e as Error).message});
    }
};