
import {Router} from 'express'
import { clienteController } from '../controllers/cliente.controller.js';

const router =Router();

router.get('/get/:idCliente', clienteController.clienteGetId);

router.put('/update/:idCliente', clienteController.clientePut);

router.post('/create', clienteController.clientePost);

router.delete('/delete', clienteController.clienteDelete);

export default router