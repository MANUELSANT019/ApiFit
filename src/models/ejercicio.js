const mongoose = require("mongoose"); // importando el componente mogoose
const {Schema}=mongoose;

const ejercicioSchema = new Schema({
  nombreEjercicio: {
    type: String,
    required: true,
  },
  peso: {
    type: Number,
    required: true,
  },
  series: {
    type: Number,
    required: true,
  },
  repeticiones: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("Ejercicio", ejercicioSchema);
