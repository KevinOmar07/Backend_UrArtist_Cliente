import { Router } from 'express'
import { check } from 'express-validator'
import { contratosController } from '../controllers/contrato.controller.js';
import { validacionesBD } from '../helpers/db-valiador.js';
import { validaciones } from '../middlewares/validar-campos.js';

const router =Router();

router.get('/get/:idCliente', contratosController.contratosGet);

router.post('/create', [
    check('datos.id_cliente', 'El id del cliente es obligatorio').not().isEmpty(),
    check('datos.id_artista', 'El id del artista es obligatorio').not().isEmpty(),
    validaciones.validarCampos,
], contratosController.contratoCreate);

router.delete('/delete/:idContrato', [
    check('idContrato', 'El ID es invalido').isInt(),
    // check('idContrato').custom(validacionesBD.favoritoExiste),
    validaciones.validarCampos,
], contratosController.contratoDelete);

export default router;

