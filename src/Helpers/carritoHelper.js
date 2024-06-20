const { default: carrito } = require("../models/carrito.js");
const Carrito = require ("../models/carrito.js");

const CarritoHelper = {
    ExisteId: async (id, req) => {
        const existe = await Carrito.findById(id);
        if (!existe) {
            throw new Error(`Registro no existe ${id}`);
        }
        req.req.usuariobd = existe;
},

existeCarrito: async (Carrito, req) => {
    if (Carrito) {
        const existe = await Carrito.findOne({ email });
        if (existe) {
            if (req.req.method === "PUT") {
                if (existe.Carrito !== req.req.Carritobd.email)
                    throw new Error(`Ya existe carrito en la base de datos!!! ${carrito}`);
            }  else {
                throw new Error(`Ya existe ese email en la base de datos!!! ${carrito}`);
            }
        }
    }
},

verificarEmail: async (carrito, req) => {
    const existe = await Carritoarrito.findOne({ carrito });

    if (!existe) {
        throw new Error('El carrito no está registrado');
    }

    req.req.carritobd = existe;
},
};

module.exports = { carritoHelper };


