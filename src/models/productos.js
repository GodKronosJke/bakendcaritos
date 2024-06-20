const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true ,max:42,unique:true},
    precio: { type: Number, default: 0 },
    cantidad: { type: Number, default: 0 },
    stockmin:{type:Number, default:0},
    estado: { type: Number, required: true, default: 1 },
}, { timestamps: true })


module.exports= mongoose.model("Producto", productoSchema)


// //PRODUCTOS
// router.get()//listar todo
// get//listar por un id
// get//liste todos los productos por debajo stockminimo
// get//listar todos los articulos por encima del precio xxx
// // listar activos, listar inactivos
// post//insertar
// put//modificar
// put//activar
// put//desactivar

const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// GET /productos - List all products
router.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /productos/:id - Get product by ID
router.get('/productos/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (producto === null) {
            return res.status(404).json({ message: 'Producto no hallado' });
        }
        res.json(producto);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /productos/bajostock - List products below stock minimum
router.get('/productos/bajostock', async (req, res) => {
    try {
        const productos = await Producto.find({ cantidad: { $lt: "$stockmin" } });
        res.json(productos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /productos/preciomayor/:precio - List products above a certain price
router.get('/productos/preciomayor/:precio', async (req, res) => {
    try {
        const productos = await Producto.find({ precio: { $gt: req.params.precio } });
        res.json(productos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /productos/activos - List active products
router.get('/productos/activos', async (req, res) => {
    try {
        const productosActivos = await Producto.find({ estado: 1 });
        res.json(productosActivos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /productos/inactivos - List inactive products
router.get('/productos/inactivos', async (req, res) => {
    try {
        const productosInactivos = await Producto.find({ estado: 0 });
        res.json(productosInactivos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /productos - Insert a new product
router.post('/productos', async (req, res) => {
    const producto = new Producto({
        nombre: req.body.nombre,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        stockmin: req.body.stockmin,
        estado: req.body.estado
    });

    try {
        const nuevoProducto = await producto.save();
        res.status(201).json(nuevoProducto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /productos/:id - Modify a product
router.put('/productos/:id', async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (producto === null) {
            return res.status(404).json({ message: 'Producto no hallado' });
        }
        res.json(producto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /productos/activar/:id - Activate a product
router.put('/productos/activar/:id', async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, { estado: 1 }, { new: true });
        if (producto === null) {
            return res.status(404).json({ message: 'Producto no hallado' });
        }
        res.json(producto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /productos/desactivar/:id - Deactivate a product
router.put('/productos/desactivar/:id', async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, { estado: 0 }, { new: true });
        if (producto === null) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
