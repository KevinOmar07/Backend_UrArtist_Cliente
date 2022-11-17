import {response} from 'express'
import { bdFavorito } from '../models/favorito.js'

const favoritoGet = async (req, res = response) => {

    const {count, rows} = await bdFavorito.favorito.findAndCountAll();

    res.json({
        msg: 'Favoritos obtenidos',
        toatl: count,
        favoritos: rows
    });
}

const favoritoCreate = async (req, res = response) => {

    const {id_cliente, id_artista} = req.body;
    const favorito = await new bdFavorito.favorito({id_cliente, id_artista});
        
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