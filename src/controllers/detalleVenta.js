const DetalleVenta = require('../models/detalleVenta');

const httpDetalle = {
    // Listar detalle de venta por ID de venta
    listDetalleVentaIdVenta: async (req, res) => {
        const { idVenta } = req.params;
        try {
            const detailSale = await detailSale.find({ idVenta });
            res.json(detailSale);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // Insertar nuevo detalle de venta
    insertDetailSale: async (req, res) => {
        const { idVenta, idProducto, cantidad, subtotal, precioUnitario,  } = req.body;
        try {
            const detailSale = new detailSale({ idVenta, idProducto, cantidad, subtotal, precioUnitario, });
            await detailSale.save();
            res.status(201).json(detailSale);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Modificar detalle de venta
    modifyDetailSale: async (req, res) => {
        const { id } = req.params;
        const { cantidad, precioUnitario, subtotal } = req.body;
        try {
            const detailSale = await DetalleVenta.findByIdAndUpdate(id,{ precioUnitario,cantidad,  subtotal }, { new: true });
            res.json(detailSale);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = {httpDetalle};
