const rutas = require('./ruta');

module.exports = (app) =>{ 
    app.use(rutas);   
};