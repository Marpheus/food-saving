import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from '../../utils/connection';
import UserModel from "../../models/user.model";
import {validateEmail} from "@/utils/validators";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            res.status(405).send({message: 'Only POST requests allowed'})
            return
        }

        await dbConnect()
        const isEmail = validateEmail(req.body.email)
        if (!isEmail) {
            res.status(500).send({message: 'Not a valid email'})
            return
        }

        await UserModel.deleteOne({
            email: req.body.email
        })

        res.status(200).send({message: 'OK'})
        return

    } catch (e) {
        res.status(400).json({error: (e as Error).message});
    }
};