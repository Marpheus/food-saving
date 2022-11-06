import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from '../../utils/connection';
import UserModel from "@/models/user.model";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            res.status(405).send({message: 'Only POST requests allowed'})
            return
        }

        await dbConnect()
        // TODO check data validity
        // const isEmail = validateEmail(req.body.email)
        // if (!isEmail) {
        //     res.status(500).send({message: 'Not a valid email'})
        //     return
        // }

        // @ts-ignore
        let user = await UserModel.findOne({
            email: req.body.email
        })

        if (user) {
            await UserModel.updateOne({email: req.body.email}, {
                config: req.body.config
            })
            // @ts-ignore
            user = await UserModel.findOne({
                email: req.body.email
            })
            res.status(200).send({user})
            return

        } else {
            res.status(500).send({message: 'User doesn\'t exist'})
            return
        }


    } catch (e) {
        res.status(400).json({error: (e as Error).message});
    }
};