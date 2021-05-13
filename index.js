const express = require('express');
const app = express();
const port = 5000;
const rutas  = require('./rutas');

app.use(express.json());
app.use(express.urlencoded());

rutas(app);
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});