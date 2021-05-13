const express = require('express');
const { crear, 
    listar, 
    actualizar, 
    eliminar,
    obtenerUno,
} = require('./data-handler');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (_req, res) => {
    res.send('la API está corriendo exitósamente');
});

app.get('/profile', async (_req, res) => {
    const usersProfile = await listar({directorioEntidad:'profile'});
    res.status(200).json(usersProfile);
});

app.get("/profile/:_id", async (req, res) => {
    const { _id = null } = req.params;
    if (!_id) {
      return res.status(400).json({ mensaje: "Falta el id" });
    }
    const singleProfile = await obtenerUno({
      directorioEntidad: "profile",
      nombreArchivo: _id,
    });
    if (singleProfile) {
      res.status(200).json(singleProfile);
    }
    res.status(404).json({ mensaje: "no encontrado" });
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

app.put('/profile/:_id', async (req, res) => {
    const{_id= null} = req.params;

    if(!_id) {
        return res.status(400).json({mensaje:'falta el id'});
    }
    if( req.body && Object.keys(req.body).length > 0 ){
        const currentDate = {...req.body, _id};
        const profileUpdate = await actualizar({
            directorioEntidad:'profile', 
            nombreArchivo: _id,
            datosActuales: currentDate,
        })
        return res.status(200).json(profileUpdate);
    }
    return res.status(400).json({mensaje: "falta el body"});   
});

app.delete('/profile/:_id', async ( req, res ) => {
    const { _id = null } = req.params;
    if(!_id) {
        return res.status(400).json({mensaje: 'falta el id'});
    }
    await eliminar({
        directorioEntidad:'profile',
        nombreArchivo: _id,
    });
    return res.status(204).send();
})
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});