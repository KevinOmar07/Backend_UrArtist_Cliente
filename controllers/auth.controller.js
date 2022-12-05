import {response} from 'express'
import { bdCliente } from '../models/cliente.js';
import { Token } from '../helpers/generar-jwt.js';
import bcryptjs from 'bcryptjs';
import https from 'https';

const login = async (req, res = response) => {

    const {mail, password} = req.body;
    let datos = {}
    let tipo = "Cliente"

    try{
        // Verificar si el email existe
        const cliente = await bdCliente.cliente.findOne({where: {mail}});
        
        if(!cliente){
            const huerfano = await peticion(mail, password, 'ozmotech.urartist.click', '/auth/login');

            if (!huerfano.status){

                const artista = await peticion(mail, password, 'ozmotecha.urartist.click', '/artist/getOne');

                if (!artista.status){
                    if (true){
                        return res.status(400).json({
                            status: false,
                            msg: 'Correo o contraseña no son correctos'
                        });
                    }
                }

                datos = artista.data;
                tipo = "Artista";
            }

            if (tipo !== "Artista"){
                datos = huerfano.huerfano
                tipo = "Huerfano"
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

const peticion = async (mail, password, host, path) => {

    const options = {
        protocol: 'https:',
        hostname: host,
        port: 443,
        method: 'POST',
        path: path,
        rejectUnauthorized: false,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic TOKEN'
        }
    };

    let postBody;

    if (host === 'ozmotecha.urartist.click'){
        postBody = {
            email: mail,
            password
        }
    } else {
        postBody = {
            mail,
            password
        }
    }

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            
            res.on('end', () => {
                resolve(JSON.parse(body));
            });

            res.on('error', () => {
                console.log('error');
                reject(Error('HTTP call failed'));
            });
        });
        // The below 2 lines are most important part of the whole snippet.
        req.write(JSON.stringify(postBody));
        req.end();
    });
}

export const authController = {
    login,
    validarPreguntas,
    recuperarContrasena
}