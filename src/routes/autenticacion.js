const express = require("express");
const router = express.Router(); //manejador de rutas de express
const userSchema = require("../models/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/signup", async (req, res) => {
    const {usuario, correo, clave} = req.body;
    const user = new userSchema({
        usuario: usuario,
        correo: correo,
        clave: clave,
    });
    user.clave = await user.encryptClave(user.clave);
    await user.save(); //save es un método de mongoose para guardar datos en MongoDB
    const token = jwt.sign(
        {id: user._id},
        process.env.SECRET,
        {
            expiresIn: 60 * 60 * 24 //un día en segundos
        }
    );
    res.json({
            auth: true,
            token
        }
    );
});

//inicio de sesión
router.post('/login', async (req, res) => {
    // validaciones
    const {error} = userSchema.validate(req.body.correo, req.body.clave);
    if (error) return res.status(400).json({error: error.details[0].message})
    const user = await userSchema.findOne({correo: req.body.correo});
    if (!user) return res.status(400).json({error: 'Usuario no encontrado'});
    const validPassword = await bcrypt.compare(req.body.clave, user.clave);
    if (!validPassword) return res.status(400).json({error: 'contraseña no válida'})
    res.json({
        error: null,
        data: 'exito bienvenido'
    })
})
module.exports = router;
