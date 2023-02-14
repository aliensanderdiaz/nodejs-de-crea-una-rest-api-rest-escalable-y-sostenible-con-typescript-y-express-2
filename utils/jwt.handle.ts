import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = <string>process.env.JWT_SECRET

const generateToken = async (id: string) => {
    const jwt = await sign({id}, JWT_SECRET, {
        expiresIn: '2h'
    })
    return jwt
}

const verifyToken = (jwt: string) => {
    const verified = verify(jwt, JWT_SECRET)
    console.log({ verified })
    return verified
}

export { generateToken, verifyToken }