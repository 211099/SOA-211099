import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const tokenSigIn = async (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.LLAVE_TOKEN,
        {
            expiresIn: '3h'
        }
    )
}


export const verifyToken  = async (token) => {
    try {
        console.log(token)
        return jwt.verify(token,  process.env.LLAVE_TOKEN)
    } catch (error) {
        return null
    }
}


