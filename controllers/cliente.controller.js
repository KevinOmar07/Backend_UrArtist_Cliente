import {response} from 'express'
import { bdCliente } from '../models/cliente.js';
import bcryptjs from 'bcryptjs';

const clienteGetId = async(req, res = response) => {

    const cliente = await bdCliente.cliente.findOne({where: {id: req.params.idCliente}})

    res.json({
        msg: 'Cliente encontrado',
        cliente
    });
}

const clienteGet = async (req, res = response) => {

    const {count, rows} = await bdCliente.cliente.findAndCountAll();

    res.json({
        msg: 'Clientes obtenidos',
        total: count,
        clientes: rows
    });
}

const validarCorreo = async (req, res = response) => {

    res.json({
        status: true,
        msg: 'El correo no existe, puede ser registrado',
    });
}

const clientePut = async (req, res = response) => {

    const idCliente =  req.params.idCliente;
    const { id, password, ...resto } = req.body;

    // validar contraseña en la base de datos
    if ( password ){
        const salts = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salts);
    }

    const cliente = await bdCliente.cliente.update(resto, {where:{id: idCliente}});

    res.json({
        msg: 'Datos actualizados',
        cliente
    });
}

const clienteCreate = async (req, res = response) => {

    const {name, lastname, mail, password, photo_profile, number_phone} = req.body;
    const client = await new bdCliente.cliente({ name, lastname, mail, password, photo_profile, number_phone });
    
    // Encriptar contraseña
    const salts = bcryptjs.genSaltSync();
    client.password = bcryptjs.hashSync(password, salts);
    
    // Guardar en la BD
    await client.save(); 
    
    res.json({
        msg: 'Cliente registrado',
        client
    });
}

const clienteDelete = async (req, res = response) => {

    const id  = req.params.idCliente;

    const eliminado = await bdCliente.cliente.destroy({where: {id}});

    res.json({
        msg: 'Cliente eliminado',
        id,
        eliminado
    });
}

export const clienteController = {
    clienteGetId, 
    clientePut, 
    clienteCreate, 
    clienteDelete,
    clienteGet,
    validarCorreo
}