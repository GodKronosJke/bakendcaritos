const express = require('express');
const router = express.Router();
const { httpProducto } = require('../controllers/productos.js');
const { validarCampos } = require('../middlewares/validarCampos');
const { productoHelper} = require('../Helpers/Productos.js');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validarJWT.js');


router.post('/',[
    validarJWT,
    check('nombre', 'Es nesesario el nombre').not().isEmpty(),
    check('precio', 'Es nesesario el precio').not().isEmpty(),
    check('cantidad', 'Es nesesaria la cantidad').not().isEmpty(),
    check('cantidad', 'Ingrese un digito ').isNumeric(),
    check('stockmin', 'El stock es nesesario').not().isEmpty(),
    validarCampos
], httpProducto.insertarProducto);

router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(productoHelper.existeProductoID),
    check('nombre', 'El nombre es nesesario').not().isEmpty(),
    check('precio', 'El precio es neseario').not().isEmpty(),
    check('stockmin', 'El stock es nesesario').not().isEmpty(),
    validarCampos
], httpProducto.modificarProducto);

router.put('/activar/:id',[
    validarJWT,
    check('id').custom(productoHelper.existeProductoID),
    validarCampos
], httpProducto.activarProducto);

router.put('/desactivar/:id',[
    validarJWT,
    check('id').custom(productoHelper.existeProductoID),
    validarCampos
], httpProducto.desactivarProducto);

router.get('/productos', httpProducto.listarProductos);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(productoHelper.existeProductoID),
    validarCampos
], httpProducto.obtenerProductoPorId);

router.get('/bajo-stock-minimo',[
    validarJWT,
    check('stockmin').isNumeric().withMessage('stockminimo'),
    validarCampos
], httpProducto.listarProductosBajoStock);

router.get('/preciopro/:precio',[
    validarJWT,
    check('precio').isNumeric().withMessage('precio'),
    validarCampos
], httpProducto.listarProductosPorPrecio);



module.exports = router;


