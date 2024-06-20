const express = require('express');
const router = express.Router();
const { httpCarrito } = require('../controllers/carrito.js');
const { validarCampos } = require('../middlewares/validarCampos');
const { clienteHelper} = require('../Helpers/clientesHelper.js');
const { productoHelper} = require('../Helpers/productosHelper.js');
const { check } = require('express-validator');

// Rutas para operaciones del carrito
router.post('/carrito:',[
    check('id').custom(clienteHelper.existeClienteID),
    check('id').custom(productoHelper.existeProductoID),
    check('valor').isNumeric().withMessage('valor'),
    check('cantidad').isNumeric().withMessage('cantidad'),
    validarCampos
], httpCarrito.insertarElementoAlCarrito);

router.get('/carrito/cliente/:clienteId',[
    check('id').custom(clienteHelper.existeClienteID),
    check('id').custom(productoHelper.existeProductoID),
], httpCarrito.listarCarritoPorCliente);

router.delete('/carrito/:id',[
    check('id').custom(productoHelper.existeProductoID),
], httpCarrito.eliminarElementoDelCarrito);

module.exports = router;

