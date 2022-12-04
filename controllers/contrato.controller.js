import {response} from 'express'
import { bdContratos } from '../models/contrato.js'

const contratosGet = async (req, res = response) => {

    const {count, rows} = await bdContratos.contratos.findAndCountAll({where: {id_cliente: req.params.idCliente}});

    res.json({
        msg: 'Contratos obtenidos',
        total: count,
        contratos: rows
    });
}

const contratoCreate = async (req, res = response) => {

    const {id_cliente, id_artista, artists_name, photo_profile} = req.body.datos;

    const contrato = await new bdContratos.contratos({id_cliente, id_artista, artists_name, photo_profile});
        
    // Guardar en la BD
    await contrato.save(); 
    
    res.json({
        msg: 'Contrato guardado',
        contrato
    });
}

const contratoDelete = async (req, res = response) => {

    const id  = req.params.idContrato;

    const eliminado = await bdContratos.contratos.destroy({where: {id}});

    res.json({
        msg: 'Contrato eliminado',
        id,
        eliminado
    });
}

export const contratosController = {
    contratosGet,
    contratoCreate,
    contratoDelete
}