const Cliente = require('../models/clientes.js');

const httpCliente = {
    // GET: Listar todos los clientes
    listClients: async (req, res) => {
        try {
            const clientes = await Cliente.find();
            res.json({ clientes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET: Obtener cliente por ID
    getClientsId: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findById(id);
            if (cliente)
                res.json({ cliente });
            else
                res.status(404).json({ msg: "Cliente no hallado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET: Listar clientes activos
    listClientsAssets: async (req, res) => {
        try {
            const clientsAssets = await Cliente.find({ estado: 1 });
            res.json({ clientsAssets });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET: Listar clientes inactivos
    listClientsInactives: async (req, res) => {
        try {
            const ClientsInactives = await Cliente.find({ estado: 0 });
            res.json({ ClientsInactives });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // POST: Insertar cliente
    insertClient: async (req, res) => {
        const { identificacion,nombre,fecha_compra,direccion, email} = req.body;
        try {
            const cliente = new Cliente({ identificacion,nombre,fecha_compra,direccion, email});
            await cliente.save();
            res.json({ cliente });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // PUT: Modificar cliente
    Clientmodify: async (req, res) => {
        const { id } = req.params;
        const { identificacion, direccion, email, fecha_compra } = req.body;
        try {
            const cliente = await Cliente.findByIdAndUpdate(id, { identificacion, direccion, email, fecha_compra }, { new: true });
            res.json({ cliente });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // PUT: Desactivar cliente
    deativateClient: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ cliente });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
    // PUT: Activar cliente

    activateClient: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ cliente });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = {httpCliente}
