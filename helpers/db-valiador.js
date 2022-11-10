import { bdCliente } from '../models/cliente.js';

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

export const validacionesBD = {
    emailExiste,
    clienteExiste
}