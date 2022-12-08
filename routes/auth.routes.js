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

router.post('/validarPreguntas', [
    check('mail', 'El correo es obligatorio').isEmail(),
    check('question_one', 'Las pregunta 1 de seguridad es obligatoria').not().isEmpty(),
    check('question_two', 'Las pregunta 2 de seguridad es obligatoria').not().isEmpty(),
    validaciones.validarCampos,
], authController.validarPreguntas);

router.put('/recuperarContrasena', [
    check('mail', 'El correo es obligatorio').isEmail(),
    check('pass').not().isEmpty().withMessage('La contraseña es obligatoria').isLength({min: 8}).withMessage('La contraseña debe ser de minimo 8 caracteres'),
    validaciones.validarCampos,
], authController.recuperarContrasena);

export default router;