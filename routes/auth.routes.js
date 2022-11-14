import { Router } from 'express'
import { check } from 'express-validator'
import { authController } from '../controllers/auth.controller.js';

import { validaciones } from '../middlewares/validar-campos.js';

const router =Router();

router.post('/login', [
    check('mail', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validaciones.validarCampos,
], authController.login);

export default router;