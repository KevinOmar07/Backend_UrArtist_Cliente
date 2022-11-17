import { Router } from 'express'
import { check } from 'express-validator'
import { favoritoController } from '../controllers/favorito.controller.js';
import { validacionesBD } from '../helpers/db-valiador.js';
import { validaciones } from '../middlewares/validar-campos.js';

const router =Router();

router.get('/getAll', favoritoController.favoritoGet);

router.post('/create', [
    check('id_cliente', 'El id del cliente es obligatorio').not().isEmpty(),
    check('id_artista', 'El id del artista es obligatorio').not().isEmpty(),
    validaciones.validarCampos,
], favoritoController.favoritoCreate);

router.delete('/delete/:idFavorito', [
    check('idFavorito', 'El ID es invalido').isInt(),
    check('idFavorito').custom(validacionesBD.favoritoExiste),
    validaciones.validarCampos,
], favoritoController.favoritoDelete);

export default router;