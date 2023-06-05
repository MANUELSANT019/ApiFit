const express = require("express");
const ejercicioSchema = require("../models/ejercicio"); //Nuevo ejercicio
const mongoose = require("mongoose");



const router = express.Router(); //manejador de rutas de express

/* ROUTES: */
//endpoint para nuevo registro
router.post("/", async (req, res) => {
  const ejercicioCreado = new ejercicioSchema(req.body);
  await ejercicioCreado.save();
  res.send({
    status: "Registro Creado",
  });
});

//endpoint para Consultar todos los ejercicios
router.get("/", async (req, res) => {
  try {
    const data = await ejercicioSchema.find();
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});
//endpoint para Modificar un ejercicio por ID

// Endpoint para Modificar un ejercicio por ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombreEjercicio, peso, series, repeticiones } = req.body;
  ejercicioSchema
    .updateOne({ _id: id }, { nombreEjercicio, peso, series, repeticiones })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
//endpoint para Consultar un ejercicio por ID
router.get("/ejercicio/:id", (req,res)=>{ //Se define la ruta 
  const{id}=req.params; //Se crea la constante
  ejercicioSchema.findById(id) //Se utiliza el método "findById()" del modelo "ejercicioSchema" para buscar en la base de datos el documento con el ID especificado
  .then((data)=> res.json(data)) //Exitoso
  .catch((error)=>res.json({message: error}));//Error
   });
// Endpoint para Eliminar usando el id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  ejercicioSchema
    .findByIdAndRemove(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;