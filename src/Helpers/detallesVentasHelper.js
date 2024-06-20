
import { Router } from 'express';
import detallesVentas from '../controllers/Ventas.js';
import { validarCampos } from '../middlewares/validar_campos.js';
import { check } from 'express-validator';

const router = Router();


Router.get('/detalles', detallesVentas);
Router.get('/productos', productos); 


Router.post(
  '/some-Route',
  [
    check('someField').notEmpty().withMessage('SomeField is required'),
    validarCampos,
  ],
  (req, res) => {
   
  }
);

export default router;

