import { Router } from 'express'
import { check } from 'express-validator'
import { clienteController } from '../controllers/cliente.controller.js';
import { validacionesBD } from '../helpers/db-valiador.js';
import { validaciones } from '../middlewares/validar-campos.js';

const router =Router();

router.get('/get/:idCliente', [
    check('idCliente', 'El ID es invalido').isInt(),
    check('idCliente').custom(validacionesBD.clienteExiste),
    validaciones.validarCampos,
],clienteController.clienteGetId);

router.get('/getAll', clienteController.clienteGet);

router.get('/validarCorreo', [
    check('mail').custom(validacionesBD.emailExiste), 
    validaciones.validarCampos,
], clienteController.validarCorreo);

router.put('/update/:idCliente', [
    check('idCliente', 'El ID es invalido').isInt(),
    check('idCliente').custom(validacionesBD.clienteExiste),
    validaciones.validarCampos,
], clienteController.clientePut);

router.post('/create', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe ser de 8 caracteres o mas').not().isEmpty().isLength({min: 8}),
    check('mail', 'El correo no es valido').isEmail(),
    check('mail').custom(validacionesBD.emailExiste),
    validaciones.validarCampos,
], clienteController.clienteCreate);

router.delete('/delete/:idCliente', [
    check('idCliente', 'El ID es invalido').isInt(),
    check('idCliente').custom(validacionesBD.clienteExiste),
    validaciones.validarCampos,
],clienteController.clienteDelete);

export default router