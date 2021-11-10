// const express = require('express'); // Sintaxis common js
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from "dotenv";

dotenv.config( { path: 'variables.env' } );

const app = express();

// Conectar a la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada') )
    .catch( () => { error => console.log(error) } );

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual (middleware propio)
app.use( (req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes"

    next(); // Con return next(); obligamos que pase al siguiente middleware
});

// Agregar body parser para leer los datos del formulario
app.use( express.urlencoded( {extended: true} ) );

// Definir la carpeta pública
app.use( express.static('public') );

// Agregar Router
app.use('/', router)

// PUERTO y HOST para la app
// HEROKU notara estos datos y asignará los correcto o que correspondan
const host = process.env.HOST || '0.0.0.0'; 
const port = process.env.PORT || '4000'

app.listen(port, host, () => {
    console.log(`El servidor esta funcionando`);
});