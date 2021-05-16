const { listar } = require('../../data-handler');

const getEntity = function closureListar(entity) {
    return async function closureHandlerListar(_req, res)  {
        if(!entity){
            res.status(404).json({mensaje:'no encontrado'});
        }
        const usersProfile = await listar({directorioEntidad: entity});
        res.status(200).json(usersProfile);
    };  
};

 module.exports = {
    getEntity,
};