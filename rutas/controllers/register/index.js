const router = require('express').Router();

const {
    actualizar, 
    eliminar,
} = require('../../../data-handler');

const { getEntity, getSingleEntity, postEntity } = require('../genericos');

const entity = 'register';

const listarHandler = getEntity(entity);
router.get( '/', listarHandler);

const obtenerUnoHandler = getSingleEntity(entity);
router.get('/:_id', obtenerUnoHandler); 

const postHandler = postEntity(entity);
router.post("/", postHandler);

router.put("/:_id", async (req, res) => {
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

router.delete("/:_id", async ( req, res ) => {
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