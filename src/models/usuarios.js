


// USUARIOS
// listar todo
// listar por un id
//  listar activos,
// listar inactivos
//insertar
//login 
//cambio contraseña
// put//modificar
// put//activar
// put//desactivar

const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true, default: "",min:8,max:15 },
    estado: { type: Number, required: true, default: 1 }
}, { timestamps: true });

// Método estático para listar todos los usuarios
usuarioSchema.statics.listarTodos = async function() {
    try {
        const usuarios = await this.find();
        return usuarios;
    } catch (error) {
        throw new Error('Error al listar usuarios');
    }
};

// Método estático para buscar usuario por ID
usuarioSchema.statics.buscarPorId = async function(id) {
    try {
        const usuario = await this.findById(id);
        return usuario;
    } catch (error) {
        throw new Error('Usuario no encontrado');
    }
};

// Método estático para listar usuarios activos
usuarioSchema.statics.listarActivos = async function() {
    try {
        const usuariosActivos = await this.find({ estado: 1 });
        return usuariosActivos;
    } catch (error) {
        throw new Error('Error al listar usuarios activos');
    }
};

// Método estático para listar usuarios inactivos
usuarioSchema.statics.listarInactivos = async function() {
    try {
        const usuariosInactivos = await this.find({ estado: 0 });
        return usuariosInactivos;
    } catch (error) {
        throw new Error('Error al listar usuarios inactivos');
    }
};

module.exports = mongoose.model("Usuario", usuarioSchema);

const Usuario = require('./models/usuarios.js');

// Función para insertar un nuevo usuario
const insertarUsuario = async (nuevoUsuario) => {
    try {
        const usuario = new Usuario(nuevoUsuario);
        await usuario.save();
        return usuario;
    } catch (error) {
        throw new Error('Error al insertar usuario');
    }
};

// Función para realizar login
const login = async (email, password) => {
    try {
        const usuario = await Usuario.findOne({ email, password });
        if (!usuario) {
            throw new Error('Credenciales inválidas');
        }
        return usuario;
    } catch (error) {
        throw new Error('Error en el login');
    }
};

module.exports = {
    insertarUsuario,
    login
};
