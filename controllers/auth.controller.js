import {response} from 'express'
import { bdCliente } from '../models/cliente.js';
import { Token } from '../helpers/generar-JWT.js';
import bcryptjs from 'bcryptjs';

const login = async (req, res = response) => {

    const {mail, password} = req.body;

    try{

        // Verificar si el email existe
        const cliente = await bdCliente.cliente.findOne({where: {mail}});

        if(!cliente){
            return res.status(400).json({
                msg: 'Correo o contraseña no son correctos - correo'
            });
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, cliente.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Correo o contraseña no son correctos - password'
            });
        }

        //const {password, ...restoCliente} = cliente

        //Generar Token
        const token = await Token.generarJWT(cliente.id);

        res.json({
            cliente,
            token
        })

    }catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal'
        });
    }
}

export const authController = {
    login
}