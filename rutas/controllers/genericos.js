const { listar, obtenerUno } = require('../../data-handler');

const getEntity = function closureListar(entity) {
    return async function closureHandlerListar(_req, res)  {
        if(!entity){
            res.status(404).json({mensaje:'no encontrado'});
        }
        const usersProfile = await listar({directorioEntidad: entity});
        res.status(200).json(usersProfile);
    };  
};

const getSingleEntity = function closureGetOne(entity) {
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
          res.status(200).json(singleEntity);
        }
        res.status(404).json({ mensaje: "no encontrado" });
    }
};

module.exports = {
   getEntity,
   getSingleEntity,
};