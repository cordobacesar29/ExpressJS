const router = require('express').Router();

const { v4: uuidv4 } = require('uuid');
const { crear, 
    listar, 
    actualizar, 
    eliminar,
    obtenerUno,
} = require('../../data-handler');

const entity = 'profile';

router.get('/', (_req, res) => {
    res.send('la API está corriendo exitósamente');
});

router.get( '/', async (_req, res) => {
    if(!entity){
        res.status(404).json({mensaje:'no encontrado'});
    }
    const usersProfile = await listar({directorioEntidad: entity});
    res.status(200).json(usersProfile);
});

router.get('/:_id', async (req, res) => {
    const { _id = null } = req.params;

    if (!_id) {
      return res.status(400).json({ mensaje: "Falta el id" });
    }
    if(!entity){
        res.status(404).json({mensaje:'no encontrado'});
    }

    const singleProfile = await obtenerUno({
      directorioEntidad: entity,
      nombreArchivo: _id,
    });
    if (singleProfile) {
      res.status(200).json(singleProfile);
    }
    res.status(404).json({ mensaje: "no encontrado" });
  });  

router.post('/', async (req, res) =>{

    if(!entity){
        res.status(404).json({mensaje:'no encontrado'});
    }

    if( req.body && Object.keys(req.body).length > 0 ){
        const _id = uuidv4();
        const dateNewProfile = {...req.body, _id};
        const newProfile = await crear({
            directorioEntidad:entity,
            nombreArchivo: _id,
            datosGuardar: dateNewProfile,
        });
        return res.status(200).json(newProfile);
    }
    return res.status(400).json({mensaje: "falta el body"});   
});

router.put('/:_id', async (req, res) => {
    const{_id= null } = req.params;

    if(!_id) {
        return res.status(400).json({mensaje:'falta el id'});
    }
    if(!entity){
        res.status(404).json({mensaje:'no encontrado'});
    }

    if( req.body && Object.keys(req.body).length > 0 ){
        const currentDate = {...req.body, _id};
        const profileUpdate = await actualizar({
            directorioEntidad: entity, 
            nombreArchivo: _id,
            datosActuales: currentDate,
        })
        return res.status(200).json(profileUpdate);
    }
    return res.status(400).json({mensaje: "falta el body"});   
});

router.delete('/:_id', async ( req, res ) => {
    const { _id = null } = req.params;
    if(!_id) {
        return res.status(400).json({mensaje: 'falta el id'});
    }
    if(!entity){
        res.status(404).json({mensaje:'no encontrado'});
    }

    await eliminar({
        directorioEntidad:entity,
        nombreArchivo: _id,
    });
    return res.status(204).send();
});
module.exports = router;