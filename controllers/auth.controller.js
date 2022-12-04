import {response} from 'express'
import { bdCliente } from '../models/cliente.js';
import { Token } from '../helpers/generar-jwt.js';
import bcryptjs from 'bcryptjs';
import axios from 'axios';

const login = async (req, res = response) => {

    const {mail, password} = req.body;
    let datos = {}
    let tipo = "Cliente"

    try{

        // Verificar si el email existe
        const cliente = await bdCliente.cliente.findOne({where: {mail}});

        if(!cliente){

            let status = true
            await axios.post('https://www.ozmotecha.urartist.click//artist/getOne', {
                "email": mail,
                "password": password
            })
            .then(function (response) {
                datos = response.data.data;
                tipo = "Artista";
            })
            .catch(function (error) {
                datos = error.response.data;
                status = error.response.data.status;
            });

            if (!status){
                return res.status(400).json({
                    status: false,
                    msg: 'Correo o contraseña no son correctos'
                });
            }
        }

        if (cliente){
            // Verificar contraseña
            const validPassword = bcryptjs.compareSync(password, cliente.password);
        
            if (!validPassword) {
                return res.status(400).json({
                    status: false,
                    msg: 'Correo o contraseña no son correctos'
                });
            }

            datos = cliente;
        }

        //Generar Token
        const token = await Token.generarJWT(datos.id);

        res.json({
            status: true,
            tipo,
            datos,
            token
        })

    }catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal'
        });
    }
}

const validarPreguntas = async (req, res = response) => {
    
    const {mail, question_one, question_two} = req.body;

    const cliente = await bdCliente.cliente.findOne({
        where: {
            mail,
            question_one,
            question_two
        }
    });

    if (!cliente) {
        return res.status(400).json({
            status: false,
            msg: 'El correo o la pregunta 1 o la pregunta 2 no son correctos'
        });
    }

    return res.json({
        status: true,
        msg: 'Datos correctos'
    });

}

const recuperarContrasena = async (req, res = response) => {
    
    const {mail, pass, ...resto} = req.body;

    const salts = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(pass, salts);

    const cliente = await bdCliente.cliente.update(resto, {where:{mail}});

    if (cliente == 0) {
        return res.status(400).json({
            status: false,
            msg: 'No se pudo actualizar la contrasena'
        });
    }

    return res.json({
        status: true,
        msg: 'Contraseña actualizada'
    });

}


export const authController = {
    login,
    validarPreguntas,
    recuperarContrasena
}