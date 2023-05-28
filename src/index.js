const express = require("express");
const { mongoose } = require("./database");
const authRoutes = require("./routes/autenticacion");
const app = express();

/* SETTINGS */
//Toma el puerto que le del servidor, si no agarra el 4000
app.set("port", process.env.PORT || 4000);

/*MIDDLEWARES:*/
app.use(express.json());

/*ROUTES:*/
app.use("/api/ejercicios", require("./routes/ejercicio.routes"));
app.use("/api/usuario", authRoutes);

app.listen(app.get("port"), () => {
  console.log("Servidor en puerto: ", app.get("port"));
});
