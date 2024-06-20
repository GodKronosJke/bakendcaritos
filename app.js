const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const jsonwebtoken = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const usuarioroutes = require('./src/routes/usuarios.js');
const clienteroutes = require('./src/routes/clientes.js');
const productoroutes = require('./src/routes/productos.js');
const carritoroutes = require('./src/routes/carrito.js');
const detalleroutes = require('./src/routes/detalleventas.js');
const ventasroutes = require('./src/routes/ventas.js');

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use('/api/carrito', carritoroutes);
app.use('/api/producto', productoroutes);
app.use('/api/cliente', clienteroutes);
app.use('/api/usuario', usuarioroutes);
app.use('/api/detalle', detalleroutes);
app.use('/api/ventas', ventasroutes);

app.listen(process.env.PORT, () => {
    console.log(`Conexión en puerto ${process.env.PORT} OK`);
    mongoose.connect('mongodb://127.0.0.1:27017/test')
        .then(() => console.log('Connected!'));
});
