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

router.put("/ejercicio/:id", (req,res)=>{ ///Se  define una ruta para manejar una solicitud PUT HTTP en la ruta /ejercicio/:id
  const{id}=req.params; //Creacion constante ID
  const{nombreEjercicio,peso,series,repeticiones}=req.body;
  ejercicioSchema.updateOne({_id:id},{  //Busca el ejercicio por ID y actualizar sus datos
    $set: {nombreEjercicio,peso,series,repeticiones} //$set se utiliza para actualizar los campos específicos del documento.
  }) 
  .then((data)=> res.json(data)) //Se realiza correctamente
  .catch((error)=>res.json({message: error}));//Se muestra el error
  
   });
//endpoint para Consultar un ejercicio por ID
router.get("/ejercicio/:id", (req,res)=>{ //Se define la ruta 
  const{id}=req.params; //Creacion constante
  ejercicioSchema.findById(id) //Se utiliza el método "findById()" del modelo "ejercicioSchema" para buscar en la base de datos el documento con el ID especificado
  .then((data)=> res.json(data)) //Exitoso
  .catch((error)=>res.json({message: error}));//Error
   });
//endpoint para Eliminar usando el id
router.delete("/ejercicio/:id", (req,res)=>{ //Ruta
  const{id}=req.params; //Se defin constante 
  ejercicioSchema.findByIdAndRemove({_id:id}) //se llama al método "findByIdAndRemove" en el modelo "EjercicioSchema" para eliminar el documento correspondiente en la base de datos. 
  .then((data)=> res.json(data)) //Exitoso
  .catch((error)=>res.json({message: error})); //Error
});

module.exports = router;