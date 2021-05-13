const router = require('express').Router();

const { v4: uuidv4 } = require('uuid');
const { crear, 
    listar, 
    actualizar, 
    eliminar,
    obtenerUno,
} = require('../data-handler');

router.get('/', (_req, res) => {
    res.send('la API está corriendo exitósamente');
});

router.get('/:entidad', async (req, res) => {
    const { entidad = null } = req.params;
    if(!entidad){
        res.status(404).json({mensaje:'no encontrado'});
    }
    const usersProfile = await listar({directorioEntidad:'profile'});
    res.status(200).json(usersProfile);
});

router.get("/:entidad/:_id", async (req, res) => {
    const { _id = null, entidad = null } = req.params;

    if (!_id) {
      return res.status(400).json({ mensaje: "Falta el id" });
    }
    if(!entidad){
        res.status(404).json({mensaje:'no encontrado'});
    }

    const singleProfile = await obtenerUno({
      directorioEntidad: entidad,
      nombreArchivo: _id,
    });
    if (singleProfile) {
      res.status(200).json(singleProfile);
    }
    res.status(404).json({ mensaje: "no encontrado" });
  });  

router.post('/:entidad', async (req, res) =>{
    const { entidad = null } = req.params;

    if(!entidad){
        res.status(404).json({mensaje:'no encontrado'});
    }

    if( req.body && Object.keys(req.body).length > 0 ){
        const _id = uuidv4();
        const dateNewProfile = {...req.body, _id};
        const newProfile = await crear({
            directorioEntidad:entidad,
            nombreArchivo: _id,
            datosGuardar: dateNewProfile,
        });
        return res.status(200).json(newProfile);
    }
    return res.status(400).json({mensaje: "falta el body"});   
});

router.put('/:entidad/:_id', async (req, res) => {
    const{_id= null, entidad = null } = req.params;

    if(!_id) {
        return res.status(400).json({mensaje:'falta el id'});
    }
    if(!entidad){
        res.status(404).json({mensaje:'no encontrado'});
    }

    if( req.body && Object.keys(req.body).length > 0 ){
        const currentDate = {...req.body, _id};
        const profileUpdate = await actualizar({
            directorioEntidad: entidad, 
            nombreArchivo: _id,
            datosActuales: currentDate,
        })
        return res.status(200).json(profileUpdate);
    }
    return res.status(400).json({mensaje: "falta el body"});   
});

router.delete('/:entidad/:_id', async ( req, res ) => {
    const { _id = null, entidad = null } = req.params;
    if(!_id) {
        return res.status(400).json({mensaje: 'falta el id'});
    }
    if(!entidad){
        res.status(404).json({mensaje:'no encontrado'});
    }

    await eliminar({
        directorioEntidad:entidad,
        nombreArchivo: _id,
    });
    return res.status(204).send();
});
module.exports = router;