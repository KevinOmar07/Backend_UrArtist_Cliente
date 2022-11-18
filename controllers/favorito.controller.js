import {response} from 'express'
import { bdFavorito } from '../models/favorito.js'

const favoritoGet = async (req, res = response) => {

    const {count, rows} = await bdFavorito.favorito.findAndCountAll({where: {id_cliente: req.params.idCliente}});

    res.json({
        msg: 'Favoritos obtenidos',
        total: count,
        favoritos: rows
    });
}

const favoritoCreate = async (req, res = response) => {

    const {id_cliente, id_artista, artists_name, photo_profile} = req.body.datos;

    const favorito = await new bdFavorito.favorito({id_cliente, id_artista,artists_name, photo_profile});
        
    // Guardar en la BD
    await favorito.save(); 
    
    res.json({
        msg: 'Favorito guardado',
        favorito
    });
}

const favoritoDelete = async (req, res = response) => {

    const id  = req.params.idFavorito;

    const eliminado = await bdFavorito.favorito.destroy({where: {id}});

    res.json({
        msg: 'Favorito eliminado',
        id,
        eliminado
    });
}

export const favoritoController = {
    favoritoGet,
    favoritoCreate,
    favoritoDelete
}