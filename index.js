require('dotenv').config()
const express = require('express');
const conection = require('./db');
conection();
const app = express();
const port = 5000;
const rutas  = require('./rutas');

app.use(express.json());
app.use(express.urlencoded());

rutas(app);
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});