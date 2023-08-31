import bcrypt from 'bcrypt'; 


export const encrypt = async (textPlain) => {
    const hash = await bcrypt.hash(textPlain, 10)
    return hash
}

export const compare = async (passworPlain, passwordHas) => {
    return await bcrypt.compare(passworPlain, passwordHas)
}