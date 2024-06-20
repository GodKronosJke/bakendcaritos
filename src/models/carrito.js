const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    cliente:{type:mongoose.Schema.Types.ObjectId,ref:'Cliente'},
    productos:{type:mongoose.Schema.Types.ObjectId,ref:'Producto'},
    cantidad:{type:Number, require:true},
    valor:{type:Number, default: 0}
}, { timestamps: true })


module.exports= mongoose.model("Carrito", carritoSchema)


// get listar carrrito x cliente
// post//insertar
// delete


const express = require('express');
const router = express.Router();
const Carrito = require('../models/carrito');

// Listar carritos por cliente
router.get('/:clienteId', async (req, res) => {
    try {
        const carritos = await Carrito.find({ cliente: req.params.clienteId }).populate('productos');
        res.json(carritos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Insertar carrito
router.post('/', async (req, res) => {
    const carrito = new Carrito({
        cliente: req.body.cliente,
        productos: req.body.productos,
        cantidad: req.body.cantidad,
        valor: req.body.valor
    });

    try {
        const nuevoCarrito = await carrito.save();
        res.status(201).json(nuevoCarrito);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar carrito
router.delete('/:id', async (req, res) => {
    try {
        await Carrito.findByIdAndDelete(req.params.id);
        res.json({ message: 'Carrito eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
