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

    const clientes = await bdCliente.cliente.findAll();

    res.json({
        msg: 'Clinetes obtenidos',
        clientes
    });
}

const clientePut = (req, res = response) => {

    const id =  req.params.idCliente;

    res.json({
        msg: 'Servicio del Cliente put',
        id
    });
}

const clienteCreate = async (req, res = response) => {

    const {mail, password, number_phone} = req.body;
    const data = req.body;
    
    // Verificar si el correo existe
    const mailExixstente = await bdCliente.cliente.findOne({mail})
    if (mailExixstente){
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        })
    }
    
    // Encriptar contraseña
    const salts = bcryptjs.genSaltSync();
    data.password = bcryptjs.hashSync(password, salts);
    data.mail = bcryptjs.hashSync(mail, salts);
    data.number_phone = bcryptjs.hashSync(number_phone, salts);
    
    // const cliente = await bdCliente.cliente.create(req.body);
    
    res.json({
        msg: 'Servicio del Cliente create',
        data
    });
}

const clienteDelete = (req, res = response) => {

    res.json({
        msg: 'Servicio del Cliente delete'
    });
}

export const clienteController = {
    clienteGetId, 
    clientePut, 
    clienteCreate, 
    clienteDelete,
    clienteGet
}