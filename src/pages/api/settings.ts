import {NextApiRequest, NextApiResponse} from "next";
import users from "data/users.json";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'GET') {
            res.status(405).send({message: 'Only GET requests allowed'})
            return
        }

        // TODO add PUT for update

        res.json({users});
    } catch (e) {
        res.status(400).json({error: (e as Error).message});
    }
};