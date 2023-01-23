const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const { connection } = require('./db');
const routes = require('./routes/routes')


const app = express();
const PORT= process.env.PORT;
const MONGO_URI= process.env.MONGO_URI;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/', routes);

//database connection
connection();
//server
app.listen(PORT, ()=> console.log(`Server is running at port ${PORT}`))