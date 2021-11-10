import { Sequelize } from "sequelize";
// require('dotenv').config( { path: 'variables.env' } );
import dotenv from "dotenv";

dotenv.config( { path: 'variables.env' } );

const db = new Sequelize(process.env.DB_NOMBRE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: {
        timestamps: false // Para no agregar columnas extras de creación y modificación de registros
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 300000,
        idle: 10000
    },
    operatorsAliases: false
});

export default db;