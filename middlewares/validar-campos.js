import { validationResult } from 'express-validator'


const validarCampos = ( req, res, next) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            status: false,
            errores
        });
    }

    next();
}

export const validaciones = {
    validarCampos
}