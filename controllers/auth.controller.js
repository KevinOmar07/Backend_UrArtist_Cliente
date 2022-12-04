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

export const authController = {
    login
}