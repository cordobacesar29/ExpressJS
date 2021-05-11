const express = require('express');
const { crear, listar } = require('./data-handler');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (_req, res) => {
    res.send('la API está corriendo exitósamente');
})
app.get('/profile', async (_req, res) => {
    const userProfile = await listar({directorioEntidad:'profile'});
    res.status(200).json(userProfile);
});

app.post('/profile', async (req, res) =>{
    if( req.body && Object.keys(req.body).length > 0 ){
        const _id = uuidv4();
        const dateNewProfile = {...req.body, _id};
        const newProfile = await crear({
            directorioEntidad:'profile',
            nombreArchivo: _id,
            datosGuardar: dateNewProfile,
        });
        return res.status(200).json(newProfile);
    }
    return res.status(400).json({mensaje: "falta el body"});   
});
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});