import { bdCliente } from '../models/cliente.js';
import { bdFavorito } from '../models/favorito.js';

const emailExiste = async (mail = '') => {
    const mailExixstente = await bdCliente.cliente.findOne({where: {mail}});
    if (mailExixstente){
        throw new Error(`EL correo ${mail} ya esta registrado`)
    }
}

const clienteExiste = async (id = '') => {
    const clienteExistente = await bdCliente.cliente.findByPk(id);
    if (!clienteExistente){
        throw new Error(`El cliente con el id ${id}, no existe`)
    }
}

const favoritoExiste = async (id = '') => {
    const favoritoExistente = await bdFavorito.favorito.findByPk(id);
    if (!favoritoExistente){
        throw new Error(`El favorito con el id ${id}, no existe`)
    }
}

export const validacionesBD = {
    emailExiste,
    clienteExiste,
    favoritoExiste
}