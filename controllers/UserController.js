import { User } from '../models/UserModel.js';
import { encrypt } from '../helpers/ashs.js';
import { compare } from '../helpers/ashs.js';
import { tokenSigIn } from '../helpers/generarToken.js'; 

export const LogIn = async (req,res) => {
    try {

        const email = req.body.email
        const password = req.body.password
        const passwordHashs = await encrypt(password)
        await User.create({email: email, password: passwordHashs})
        res.status(201).send('usuario registrado con exito')
    } catch (error) {
         res.status(500).send('Ocurrió un error: ' + error.message);
    }
}

export const Register = async (req,res) =>{
    try {
        const email = req.body.email
        const password = req.body.password
        
        const users = await User.findAll({where: {email: email}} );
        
        if (!users || users.length === 0) {
            res.status(401).send('Credenciales incorrectas');
        } else {
            const checkPassword = await compare(password, users[0].password);
            if (checkPassword) {
                // Generar token
                const token = await tokenSigIn(users[0]);
                res.status(200).send(token);
            } else {
                res.status(401).send('Credenciales incorrectas');
            }
        }
        
    } catch (error) {
        res.status(500).send('ocurrio un error: ' + error.message)
    }
}