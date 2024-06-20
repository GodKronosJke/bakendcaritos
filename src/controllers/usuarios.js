const Usuario = require('../models/usuarios.js');
const { generarJWT } = require('../middlewares/validarJWT.js');
const bcryptjs = require('bcryptjs');

const httpUsuarios = {
      
    insertUser: async (req, res) => {
          
        const { email, password } = req.body;
        const usuario = new Usuario({ email,password});

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt)

        await usuario.save()

        res.json({
            usuario
        })
    },

    
    
    
    
    
    // GET: Lista de all users
    listUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.find();
            res.json({ usuarios });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET: Listar usuario por ID
    obtainUsuarioPorId: async (req, res) => {
        const { id } = req.params;
        try {
            const usuario = await Usuario.findById(id);
            if (usuario)
                res.json({ usuario });
            else
                res.status(404).json({ msg: "Usuario no hallado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET: Listar usuarios activos
    listUsuariosActives: async (req, res) => {
        try {
            const usuariosActives = await Usuario.find({ estado: 1 });
            res.json({ usuariosActives });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET: Listar usuarios inactivos
    listUsuariosInactives: async (req, res) => {
        try {
            const usuariosInactives = await Usuario.find({ estado: 0 });
            res.json({ usuariosInactives });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // POST: Insertar usuario
    insertUsuario: async (req, res) => {
        const { password, email  } = req.body;
        try {
            const usuario = new Usuario({ email, password });
            await usuario.save();
            res.json({ usuario });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // POST: Login de usuario
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await Usuario.findOne({ email })
            if (!user) {
                return res.status(401).json({
                    msg: "El password de usuario no es el adecuado"
                })
            }

            if (user.estado === 0) {
                return res.status(401).json({
                    msg: "El password de usuario no es el adecuado"
                })
            }

            /////////costear o no  /////////

            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(401).json({
                    msg: "El password de usuario no es el adecuado"
                })
            }

            const token = await generarJWT(user._id);

            res.json({
                usuario: user,
                token
            })

        } catch (error) {
console.log(error);
            return res.status(500).json({


                msg: "Comunicarse con el web master"
            })
        }
    },

    



    // PUT: Cambiar contraseña
    PaswordChange: async (req, res) => {
        const { id } = req.params;
        const { newPassword } = req.body;
        try {
            const usuario = await Usuario.findById(id);
            if (usuario) {
                usuario.password = newPassword;
                await usuario.save();
                res.json({ msg: "Contraseña actualizada adecuadamente" });
            } else {
                res.status(404).json({ msg: "Usuario no hallado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // PUT: Modificar usuario
    modifyUsuario: async (req, res) => {
        const { id } = req.params;
        const { email, password } = req.body;
        try {
            const usuario = await Usuario.findById(id);
            if (usuario) {
                usuario.email = email;
                usuario.password = password;
                await usuario.save();
                res.json({ msg: "Usuario modificado adecuadamente" });
            } else {
                res.status(404).json({ msg: "Usuario no hallado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // PUT: Activar usuario
    activateUsuario: async (req, res) => {
        const { id } = req.params;
        try {
            await Usuario.findByIdAndUpdate(id, { estado: 1 });
            res.json({ msg: "Usuario activado adecuadamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // PUT: Desactivar usuario
    
deactivateUsuario: async (req, res) => {
        const { id } = req.params;
        try {
            await Usuario.findByIdAndUpdate(id, { estado: 0 });
            res.json({ msg: "Usuario desactivado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    
    
};

module.exports = {httpUsuarios};

