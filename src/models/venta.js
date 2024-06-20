const mongoose = require('mongoose');

const ventasSchema = new mongoose.Schema({
    idcliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    idventa: { type: mongoose.Schema.Types.ObjectId, ref: 'Venta' },
    fecha: { type: Date, required: true },
    valor: { type: Number, default: 0 },
    cantidad: { type: Number, default: 0 },
    descuento: { type: Number, default: 0 }
}, { timestamps: true });

// Método estático para listar todas las ventas
ventasSchema.statics.listarTodas = async function () {
    try {
        const ventas = await this.find();
        return ventas;
    } catch (error) {
        throw new Error('Error al listar ventas');
    }
};

// Método estático para buscar una venta por ID
ventasSchema.statics.buscarPorId = async function (id) {
    try {
        const venta = await this.findById(id);
        return venta;
    } catch (error) {
        throw new Error('Venta no encontrada');
    }
};

// Método estático para listar ventas activas
ventasSchema.statics.listarActivas = async function () {
    try {
        const ventasActivas = await this.find({ estado: 1 });
        return ventasActivas;
    } catch (error) {
        throw new Error('Error al listar ventas activas');
    }
};

// Método estático para listar ventas inactivas
ventasSchema.statics.listarInactivas = async function () {
    try {
        const ventasInactivas = await this.find({ estado: 0 });
        return ventasInactivas;
    } catch (error) {
        throw new Error('Error al listar ventas inactivas');
    }
};

// Método estático para listar ventas de un cliente específico
ventasSchema.statics.listarPorCliente = async function (idCliente) {
    try {
        const ventasCliente = await this.find({ idcliente: idCliente });
        return ventasCliente;
    } catch (error) {
        throw new Error('Error al listar ventas del cliente');
    }
};

// Método estático para listar ventas entre dos fechas
ventasSchema.statics.listarEntreFechas = async function (fechaInicio, fechaFin) {
    try {
        const ventasEntreFechas = await this.find({ fecha: { $gte: fechaInicio, $lte: fechaFin } });
        return ventasEntreFechas;
    } catch (error) {
        throw new Error('Error al listar ventas entre fechas');
    }
};

// Método estático para listar ventas con un valor superior a cierto monto
ventasSchema.statics.listarValorSuperior = async function (valorMinimo) {
    try {
        const ventasValorSuperior = await this.find({ valor: { $gt: valorMinimo } });
        return ventasValorSuperior;
    } catch (error) {
        throw new Error('Error al listar ventas con valor superior');
    }
};

// Método estático para calcular el total de ventas entre dos fechas
ventasSchema.statics.totalVentasEntreFechas = async function (fechaInicio, fechaFin) {
    try {
        const totalVentas = await this.aggregate([
            {
                $match: {
                    fecha: { $gte: fechaInicio, $lte: fechaFin }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$valor" }
                }
            }
        ]);

        return totalVentas.length > 0 ? totalVentas[0].total : 0;
    } catch (error) {
        throw new Error('Error al calcular el total de ventas entre fechas');
    }
};

// Método estático para calcular el total de descuentos
ventasSchema.statics.totalDescuentos = async function () {
    try {
        const totalDescuentos = await this.aggregate([
            {
                $group: {
                    _id: null,
                    totalDescuento: { $sum: "$descuento" }
                }
            }
        ]);

        return totalDescuentos.length > 0 ? totalDescuentos[0].totalDescuento : 0;
    } catch (error) {
        throw new Error('Error al calcular el total de descuentos');
    }
};

module.exports = mongoose.model("Venta", ventasSchema);
