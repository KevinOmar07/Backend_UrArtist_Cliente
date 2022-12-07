import {request, response} from 'express'
import { bdCliente } from '../models/cliente.js';
import { contenido } from '../helpers/subir-imagen.js';
import bcryptjs from 'bcryptjs';
import { apiExterno } from '../helpers/peticion.api.js';

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

    let foto = "No actualizo foto de perfil";

    if (req.files['perfilfile']){
        req.file = req.files['perfilfile'][0]
        resto.photo_profile = await cargar_imagen(req, res);
        foto = resto.photo_profile;
    }
    
    // validar contraseña en la base de datos
    if ( password ){
        const salts = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salts);
    }

    const cliente = await bdCliente.cliente.update(resto, {where:{id: idCliente}});

    res.json({
        msg: 'Datos actualizados',
        cliente,
        foto
    });
}

const clienteCreate = async (req = request, res = response) => {
    
    const {name, lastname, mail, password, number_phone, question_one, question_two, ...resto} = req.body;

    const bodyA = {email: mail}
    const artista = await apiExterno.peticion(bodyA, 'ozmotecha.urartist.click', '/artist/exist', 'POST');

    const bodyH = {mail}
    const huerfano = await apiExterno.peticion(bodyH, 'ozmotech.urartist.click', '/artistaHuerfano/validarCorreo', 'POST');

    if (artista.status || !huerfano.status){
        res.status(400).json({
            status: false,
            msg: "El correo ya se encuentra registrado"
        })
    } else {
        if (req.files['perfilfile']){
            req.file = req.files['perfilfile'][0]
            resto.img_profile = await cargar_imagen(req, res);
        }
        
        const client = await new bdCliente.cliente({ name, lastname, mail, password, photo_profile: resto.img_profile, number_phone, question_one, question_two });
        
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

async function cargar_imagen(req, res) {    
    const url = await contenido.create_image( req, res );
    return url
}

export const clienteController = {
    clienteGetId, 
    clientePut, 
    clienteCreate, 
    clienteDelete,
    clienteGet,
    validarCorreo
}