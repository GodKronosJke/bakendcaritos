const mongoose = require('mongoose');

const detalle_ventasSchema = new mongoose.Schema({
    idcliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    fecha: { type: Date, required: true },
    valor: { type: Number, default: 0 },
    activo: { type: Boolean, default: true } // Campo para indicar si el detalle de venta está activo o no
}, { timestamps: true });

const DetalleVenta = mongoose.model("detalleVenta", DetalleVentachema);

// Comentarios agregados:
// // clientes

// Función para listar todos los detalles de ventas
async function listarTodosDetallesVentas() {
    try {
        const detalles = await DetalleVenta.find().populate('idcliente').exec();
        return detalles;
    } catch (error) {
        throw new Error(`Error al listar todos los detalles de ventas: ${error.message}`);
    }
}

// Función para listar un detalle de venta por su ID
async function listarDetalleVentaPorId(idDetalle) {
    try {
        const detalle = await DetalleVenta.findById(idDetalle).populate('idcliente').exec();
        return detalle;
    } catch (error) {
        throw new Error(`Error al listar detalle de venta por ID: ${error.message}`);
    }
}

// Función para listar detalles de ventas activos
async function listarDetallesActivos() {
    try {
        const detallesActivos = await DetalleVenta.find({ activo: true }).populate('idcliente').exec();
        return detallesActivos;
    } catch (error) {
        throw new Error(`Error al listar detalles de ventas activos: ${error.message}`);
    }
}

// Función para listar detalles de ventas inactivos
async function listarDetallesInactivos() {
    try {
        const detallesInactivos = await DetalleVenta.find({ activo: false }).populate('idcliente').exec();
        return detallesInactivos;
    } catch (error) {
        throw new Error(`Error al listar detalles de ventas inactivos: ${error.message}`);
    }
}

// Función para insertar un nuevo detalle de venta
async function insertarDetalleVenta(detalleVenta) {
    try {
        const nuevoDetalle = new DetalleVenta(detalleVenta);
        const resultado = await nuevoDetalle.save();
        return resultado;
    } catch (error) {
        throw new Error(`Error al insertar detalle de venta: ${error.message}`);
    }
}

// Función para modificar un detalle de venta existente
async function modificarDetalleVenta(idDetalle, nuevoDetalle) {
    try {
        const resultado = await DetalleVenta.findByIdAndUpdate(idDetalle, nuevoDetalle, { new: true });
        return resultado;
    } catch (error) {
        throw new Error(`Error al modificar detalle de venta: ${error.message}`);
    }
}

// Función para activar un detalle de venta
async function activarDetalleVenta(idDetalle) {
    try {
        const resultado = await DetalleVenta.findByIdAndUpdate(idDetalle, { activo: true }, { new: true });
        return resultado;
    } catch (error) {
        throw new Error(`Error al activar detalle de venta: ${error.message}`);
    }
}

// Función para desactivar un detalle de venta
async function desactivarDetalleVenta(idDetalle) {
    try {
        const resultado = await DetalleVenta.findByIdAndUpdate(idDetalle, { activo: false }, { new: true });
        return resultado;
    } catch (error) {
        throw new Error(`Error al desactivar detalle de venta: ${error.message}`);
    }
}

module.exports = {
    DetalleVenta,
    listarTodosDetallesVentas,
    listarDetalleVentaPorId,
    listarDetallesActivos,
    listarDetallesInactivos,
    insertarDetalleVenta,
    modificarDetalleVenta,
    activarDetalleVenta,
    desactivarDetalleVenta
};


