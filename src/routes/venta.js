const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { httpVenta } = require('../controllers/venta.js'); 
const { ventaHelper } = require('../Helpers/ventasHelper.js')

router.post('/',[
    check('idCliente').custom(ventaHelper.existeClienteID),
    check('id', 'el cliente es nesesario').not().isEmpty(),
    check('id').custom(ventaHelper.existeventaID),
    validarCampos
], httpVenta.crear); 

router.put('/:id',[
    check('idCliente').custom(ventaHelper.existeClienteID),
    check('idCliente', 'el cliente es nesesrio').not().isEmpty(),
    check('id').custom(ventaHelper.existeventaID),
    validarCampos
], httpVenta.actualizar); 

router.put('/activar/:id',[
    check('id').custom(ventaHelper.existeventaID),
    validarCampos
], httpVenta.activar); 

router.put('/desactivar/:id',
[
    check('id').custom(ventaHelper.existeventaID),
    validarCampos
],  httpVenta.desactivar); 

router.get('/:id',[
    check('id').custom(ventaHelper.existeventaID),
    validarCampos
], httpVenta.obtenerPorId); 

router.get('/activas',[
    check('id').custom(ventaHelper.existeventaID),
    validarCampos
], httpVenta.listarActivas); 

router.get('/inactivas',[
    check('id').custom(ventaHelper.existeventaID),
    validarCampos
], httpVenta.listarInactivas);

router.get('/cliente/:id',[
    check('idCliente').custom(ventaHelper.existeClienteID),
], httpVenta.listarPorCliente); 

router.get('/fechas/:inicio/:fin',[
    check('inicio').isDate().withMessage('fecha de inicio'),
    check('fin').isDate().withMessage('fecha fin')
], httpVenta.listarPorRangoDeFechas); 

router.get('/valor/:valor',[
    check('valor').isNumeric().withMessage('valor')
], httpVenta.listarPorValorSuperior);

router.get('/totalventas/:inicio/:fin',[
    check('inicio').isDate().withMessage('fecha de inicio'),
    check('fin').isDate().withMessage('fecha fin')
], httpVenta.calcularTotalPorRangoDeFechas); 

router.get('/totaldescuento',[
    check('valor').isNumeric().withMessage('valor')
], httpVenta.calcularTotalDescuento); 

router.get('/', httpVenta.listarTodo); 


module.exports = router;
