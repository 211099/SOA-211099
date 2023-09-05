import { Router } from "express";
import { User } from '../models/UserModel.js';
import { encrypt } from '../helpers/ashs.js';
import { compare } from '../helpers/ashs.js';
import { tokenSigIn } from '../helpers/generarToken.js'; 

const router = Router()

router.post('/post/sig-up', async (req,res) => {
    try {

        const email = req.body.email
        const password = req.body.password
        const passwordHashs = await encrypt(password)
        await User.create({email: email, password: passwordHashs})
        res.status(200).send('usuario registrado con exito')
    } catch (error) {
         res.status(500).send('Ocurrió un error: ' + error.message);
    }
})

router.post('/post/sing-in', async (req,res) => {
    try {
        const email = req.body.email
        const password = req.body.password

         if (typeof email !== 'string' || email.trim() === '') {
            return res.status(400).send('El campo de correo electrónico es inválido o está vacío.');
        }
       
        if (typeof password !== 'string' || password.trim() === '') {
            return res.status(400).send('El campo de contraseña es inválido o está vacío.');
        }
        
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
})


export default router