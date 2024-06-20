const Carrito = require('../models/carrito.js');

const httpCarrito = {
    listCarClient: async (req, res) => {
        const clienteId = req.params.clienteId;
        try {
            const carrito = await Carrito.find({ cliente: clienteId }).populate('productos');
            res.json(carrito);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    insertElementCar: async (req, res) => {
        const { cliente, productos, cantidad, valor } = req.body;
        try {
            const newElement = new Carrito({ cliente, productos, cantidad, valor });
            await newElement.save();
            res.status(201).json(newElement);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    eraseElementCar: async (req, res) => {
        const elementoId = req.params.elementoId;
        try {
            await Carrito.findByIdAndDelete(elementoId);
            res.json({ message: 'Componente eliminado del carrito' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = {httpCarrito}