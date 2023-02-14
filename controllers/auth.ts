import { Request, Response } from "express"
import { registerNewUser, loginUser } from "../services/auth"

const registerCtrl = async ({ body }: Request, res: Response) => {
    const responseUser = await registerNewUser(body)
    res.send(responseUser)
}

const loginCtrl = async (req: Request, res: Response) => {
    const responseLogin = await loginUser(req.body)
    res.send(responseLogin)
}

export {
    registerCtrl,
    loginCtrl
}