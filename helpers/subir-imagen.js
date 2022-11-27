import { cloudinary } from '../database/cloudynari.config.js'
import { dataUri } from '../middlewares/multer-perfil.js';

const create_image = async(req, res) => {

    if(!req.file) {
        res.status(400).json({
            messge: 'No selecciono archivo',
        })
    }

    const file = dataUri(req).content;
    console.log( 'Subir imagen ');
    return cloudinary.v2.uploader.upload(file)
        .then((result) => {
        const image = result.url;
        return image;
    }).catch((err) => res.status(400).json({
        messge: 'Algo falló al subir la imagen',
        data: {
            err
        }
    }))
};

export const contenido = {
    create_image
}