const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    documento: { type: String, required: true ,min:10,unique:true},
    direccion: { type: String, required: true},
    email: { type: String, required: true, unique:true},
    fecha_compra: { type: Date, required: true},
}, { timestamps: true })


module.exports= mongoose.model("Cliente", clienteSchema)


// //clientes
//get()//listar todo
// get//listar por un id
// listar activos,
//listar inactivos
// post//insertar
// put//modificar
// put//activar
// put//desactivar

const express = require('express');
const router = express.Router();
const Cliente = require('../models/clientes');

// Listar todos los clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Listar un cliente por su ID
router.get('/:id', getCliente, (req, res) => {
    res.json(res.cliente);
});

// Listar clientes activos
router.get('/activos', async (req, res) => {
    try {
        const clientesActivos = await Cliente.find({ activo: true });
        res.json(clientesActivos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Listar clientes inactivos
router.get('/inactivos', async (req, res) => {
    try {
        const clientesInactivos = await Cliente.find({ activo: false });
        res.json(clientesInactivos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Insertar un nuevo cliente
router.post('/', async (req, res) => {
    const cliente = new Cliente({
        nombre: req.body.nombre,
        documento: req.body.documento,
        direccion: req.body.direccion,
        email: req.body.email,
        fecha_compra: req.body.fecha_compra
    });

    try {
        const nuevoCliente = await cliente.save();
        res.status(201).json(nuevoCliente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Modificar un cliente
router.put('/:id', getCliente, async (req, res) => {
    if (req.body.nombre != null) {
        res.cliente.nombre = req.body.nombre;
    }
    if (req.body.documento != null) {
        res.cliente.documento = req.body.documento;
    }
    if (req.body.direccion != null) {
        res.cliente.direccion = req.body.direccion;
    }
    if (req.body.email != null) {
        res.cliente.email = req.body.email;
    }
    if (req.body.fecha_compra != null) {
        res.cliente.fecha_compra = req.body.fecha_compra;
    }
    try {
        const clienteActualizado = await res.cliente.save();
        res.json(clienteActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Activar un cliente
router.put('/activar/:id', getCliente, async (req, res) => {
    res.cliente.activo = true;
    try {
        const clienteActualizado = await res.cliente.save();
        res.json(clienteActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Desactivar un cliente
router.put('/desactivar/:id', getCliente, async (req, res) => {
    res.cliente.activo = false;
    try {
        const clienteActualizado = await res.cliente.save();
        res.json(clienteActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

async function getCliente(req, res, next) {
    let cliente;
    try {
        cliente = await Cliente.findById(req.params.id);
        if (cliente == null) {
            return res.status(404).json({ message: 'Cliente no hallado' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.cliente = cliente;
    next();
}

module.exports = router;

