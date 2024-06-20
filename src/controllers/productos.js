
const Producto = require('../models/productos.js')
const httpProducto = {    // Listar todos los productos
 
    listProducts: async (req, res) => {
        try {
            const productos = await Producto.find();
            res.json(productos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Lista de producto por ID
    obtainProductPorId: async (req, res) => {
        const { id } = req.params;
        try {
            const producto = await Producto.findById(id);
            if (producto) {
                res.json(producto);
            } else {
                res.status(404).json({ msg: "Producto no hallado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Lista de productos por debajo del stock mínimo
    listProductsLowStock: async (req, res) => {
        try {
            const productosBajoStock = await Producto.find({ cantidad: { $lt: { stockminimo } } });
            res.json(productosBajoStock);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Lista de productos por encima del precio especificado
    listProductsporprice: async (req, res) => {
        const { precio } = req.params;
        try {
            const productosPorPrecio = await Producto.find({ precio: { $gt: precio } });
            res.json(productosPorPrecio);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Insertar nuevo producto
    insertProduct: async (req, res) => {
        const { nombre, precio, stockminimo, cantidad,  estado } = req.body;
        try {
            const product = new Producto({ nombre, precio, stockminimo, cantidad,  estado  });
            await product.save();
            res.json(product);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Modificar producto
    modifyProduct: async (req, res) => {
        const { id } = req.params;
        const { nombre, precio, stockminimo, cantidad,  estado  } = req.body;
        try {
            const producto = await Producto.findByIdAndUpdate(id, { nombre, precio, stockminimo, cantidad,  estado  }, { new: true });
            res.json(producto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Activar producto
    activateProduct: async (req, res) => {
        const { id } = req.params;
        try {
            const producto = await Producto.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json(producto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Desactivar producto
    desactivateProduct: async (req, res) => {
        const { id } = req.params;
        try {
            const producto = await Producto.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json(producto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = {httpProducto};