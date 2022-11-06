import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from '../../utils/connection';
import UserModel from "../../models/user.model";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'GET') {
            res.status(405).send({message: 'Only GET requests allowed'})
            return
        }

        await dbConnect()

        // @ts-ignore
        const users = await UserModel.find({})

        res.status(200).json({users: users})
        return

    } catch (e) {
        res.status(400).json({error: (e as Error).message});
    }
};