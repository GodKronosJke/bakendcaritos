import Cliente from "../models/clientes.js";

export const ClienteHelper = {

    validarClienteID: async (id, req) => {
        const existe = await Cliente.findOne(id);
        if (!existe) {
            throw new Error(`El cliente no existe ${id}`);
        }
          req.req.clientebd = existe
    },

 validarExisteId: async (req) => {
     const existe = await Cliente.findOne({ ExisteId })
if (ExisteId) {
            if (req.req.method === "PUT"){
                    if (existe.ExisteId !== req.req.clientebd.ExisteId)
                        throw new Error(`Ya existe ExisteId en la base de datos!!! ${ExisteId}`)

        }else {
                    throw new Error(`Ya existe ExisteId en la base de datos!!! ${ExisteId}`)
         }
    }
 }
}

verificarExisteId: async (ExisteId, req) => {

        const existe = await Carrito.findOne({ ExisteId });
        if (!existe) {
            throw new Error(`El ExisteId no está en el registro`)
        }
        req.req.clientebd = existe;

    }




