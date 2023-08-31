import jwt from 'jsonwebtoken';

const llave = "asldalks12@"
export const tokenSigIn = async (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        llave,
        {
            expiresIn: '3h'
        }
    )
}


export const verifyToken  = async (token) => {
    try {
        console.log(token)
        return jwt.verify(token, "asldalks12@")
    } catch (error) {
        return null
    }
}


