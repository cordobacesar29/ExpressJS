const router = require('express').Router();

const {
    eliminar,
} = require('../../../data-handler');

const { 
    getEntity,
    getOneEntity,
    postEntity,
    putEntity,
} = require('../genericos');

const entity = 'profile';

const getHandler = getEntity(entity);
router.get( '/', getHandler);

const getOneHandler = getOneEntity(entity);
router.get('/:_id', getOneHandler);  

const postHandler = postEntity(entity);
router.post('/', postHandler);

const putHandler = putEntity(entity);
router.put("/:_id", putHandler);

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