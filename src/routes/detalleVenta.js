const express = require('express');
const router = express.Router();
const {httpDetalle} = require('../controllers/detalleVentas.js');
const { validarCampos } = require('../middlewares/validarCampos');
const { detalleVHelper} = require('../Helpers/detalleVentasHelper.js');
const { check } = require('express-validator');

router.post('/detalle-venta',[
    check('idVenta', 'El idVenta es nesesario').not().isEmpty(),
    check('idexiste').custom(detalleVHelper.existeProductoID),
    check('valor').isNumeric().withMessage('valor'),
    check('fecha').isDate().withMessage('fecha'),
validarCampos
],httpDetalle.insertarDetalleVenta);

router.put('/detalle-venta/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('idexiste').custom(detalleVHelper.existeProductoID),
    validarCampos

],httpDetalle.modificarDetalleVenta);

router.get('/detalle_venta/:idVenta',[
    check('idVenta', 'El idVenta es obligatorio').not().isEmpty(),
    validarCampos
],httpDetalle.listarDetalleVentaPorIdVenta);