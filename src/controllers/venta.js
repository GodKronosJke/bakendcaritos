const Venta = require('../models/venta.js'); 

const httpVenta = {
    // Listar todas las ventas
    Alllist: async (req, res) => {
        try {
            const ventas = await Venta.find();
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtener una venta por su ID
    obtainPorId: async (req, res) => {
        try {
            const venta = await Venta.findById(req.params.id);
            if (venta) {
                res.json(venta);
            } else {
                res.status(404).json({ message: 'Venta no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Listar ventas activas
    listActivate: async (req, res) => {
        try {
            const ventasActivas = await Venta.find({ activo: true });
            res.json(ventasActivas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Listar ventas inactivas
    listInactives: async (req, res) => {
        try {
            const ventasInactives = await Venta.find({ activo: false });
            res.json(ventasInactives);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Listar ventas de un cliente específico
    listPorClient: async (req, res) => {
        try {
            const salesClient = await Venta.find({ idcliente: req.params.id });
            res.json(salesClientClient);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Listar todas las ventas entre dos fechas
    listByDateRange: async (req, res) => {
        try {
            const { inicio, fin } = req.params;
            const ventasEnRango = await Venta.find({ fecha: { $gte: inicio, $lte: fin } });
            res.json(ventasEnRango);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Listar ventas con un valor superior a cierto valor
   
listByTopValue: async (req, res) => {
        try {
            const salesValueTop = await Venta.find({ valor: { $gt: req.params.valor } });
            res.json(salesValueTop);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Calcular el total de ventas entre dos fechas
    calculateTotalByDateRange: async (req, res) => {
        try {
            const { begin, end } = req.params;
            const totalSales = await Venta.aggregate([
                {
                    $match: {
                        fecha: { $gte: new Date(begin), $lte: new Date(end) }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$valor" }
                    }
                }
            ]);
            res.json(totalSales);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Calcular el total de descuento aplicado en todas las ventas
    calculateTotalDiscount: async (req, res) => {
        try {
            const totalDiscount = await Venta.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$descuento" }
                    }
                }
            ]);
            res.json(totalDiscount);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Insertar una nueva venta
    create: async (req, res) => {
        const venta = new Venta(req.body);
        try {
            const newVenta = await venta.save();
            res.status(201).json(newVenta);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Actualizar una venta por su ID
    update: async (req, res) => {
        try {
            const venta = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (venta) {
                res.json(venta);
            } else {
                res.status(404).json({ message: 'Venta no encontrada' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Activar una venta por su ID
    activate: async (req, res) => {
        try {
            const venta = await Venta.findByIdAndUpdate(req.params.id, { activo: true }, { new: true });
            if (venta) {
                res.json(venta);
            } else {
                res.status(404).json({ message: 'Venta no encontrada' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Desactivar una venta por su ID
    deactivate: async (req, res) => {
        try {
            const venta = await Venta.findByIdAndUpdate(req.params.id, { activo: false }, { new: true });
            if (venta) {
                res.json(venta);
            } else {
                res.status(404).json({ message: 'Venta no hallada' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = {httpVenta}
