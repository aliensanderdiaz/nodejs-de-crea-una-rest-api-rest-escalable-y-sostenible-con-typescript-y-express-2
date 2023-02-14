import { NextFunction, Request, Response } from "express"

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log({ message: 'Pasé por el middleware' })
    next()
}

export { logMiddleware }