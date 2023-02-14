import { Auth } from "../interfaces/auth.interface"
import { User } from "../interfaces/user"
import UserModel from "../models/user"
import { encrypt, verified } from "../utils/bcrypt.handle"
import { generateToken } from "../utils/jwt.handle"

const registerNewUser = async (authUser: User) => {
    const { email, name, password, description } = authUser
    const checkIs = await UserModel.findOne({ email })
    if (checkIs) return "ALREADY_USER"
    const passHash = await encrypt(password)

    const registerUser = await UserModel.create({ 
        email, 
        name, 
        password: passHash, 
        description 
    })

    return registerUser
}

const loginUser = async ({ email, password}: Auth) => {
    const checkIs = await UserModel.findOne({ email })
    if (!checkIs) return "NOT_FOUND_USER"
    const passwordHash = checkIs.password

    const comparePassword = await verified(password, passwordHash)

    if (!comparePassword) return "PASSWORD_INCORRECT"

    const token = await generateToken(checkIs.email)

    const data = {
        token,
        user: checkIs
    }

    return data
}

export { registerNewUser, loginUser }