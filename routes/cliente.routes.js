import {Router} from 'express'
import {check} from 'express-validator'
import { clienteController } from '../controllers/cliente.controller.js';
import { validaciones } from '../middlewares/validar-campos.js';

const router =Router();

router.get('/get/:idCliente', clienteController.clienteGetId);

router.get('/getAll', clienteController.clienteGet);

router.put('/update/:idCliente', clienteController.clientePut);

router.post('/create', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe ser de 8 caracteres o mas').not().isEmpty().isLength({min: 8}),
    check('mail', 'El correo no es valido').isEmail(),
    validaciones.validarCampos
] ,clienteController.clienteCreate);

router.delete('/delete/:idCliente', clienteController.clienteDelete);

export default router