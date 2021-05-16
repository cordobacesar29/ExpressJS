const { v4: uuidv4 } = require('uuid');
const { 
    listar,
    obtenerUno, 
    crear, 
    actualizar,
    eliminar
} = require('../../data-handler');

const getEntity = function closureGet(entity) {
    return async function closureHandlerGet(_req, res)  {
        if(!entity){
            res.status(404).json({mensaje:'no encontrado'});
        }
        const usersProfile = await listar({directorioEntidad: entity});
        res.status(200).json(usersProfile);
    };  
};

const getOneEntity = function closureGetOne(entity) {
    return async function closureHandlerGetOne(req, res) {
        const { _id = null } = req.params;
    
        if (!_id) {
          return res.status(400).json({ mensaje: "Falta el id" });
        }
        if(!entity){
            res.status(404).json({mensaje:'no encontrado'});
        }
    
        const singleEntity = await obtenerUno({
          directorioEntidad: entity,
          nombreArchivo: _id,
        });
        if (singleEntity) {
           return res.status(200).json(singleEntity);
        }
        res.status(404).json({ mensaje: "no encontrado" });
    };
};

const postEntity = function closurePost(entity) {
    return async function closureHandlerPost(req, res) {

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
    }
};

const putEntity = function closurePutEntity(entity) {
    return  async function closureHandlerPut(req, res) {
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
    }
};

const deleteEntity = function closureDeleteEntity(entity) {
    return async function closureHandlerDelete( req, res ) {
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
    }
};

module.exports = {
   getEntity,
   getOneEntity,
   postEntity,
   putEntity,
   deleteEntity
};