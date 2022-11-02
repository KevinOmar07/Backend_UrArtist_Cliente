import {response} from 'express'

const clienteGetId = (req, res = response) => {

    const id = req.params.idCliente;

    res.json({
        msg: 'Servicio del Cliente',
        id
    });
}

const clientePut = (req, res = response) => {

    const id =  req.params.idCliente;

    res.json({
        msg: 'Servicio del Cliente put',
        id
    });
}

const clientePost = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'Servicio del Cliente post',
        data: body
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
    clientePost, 
    clienteDelete
}