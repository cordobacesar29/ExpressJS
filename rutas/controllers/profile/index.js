const router = require('express').Router();
const { 
    getEntity,
    getOneEntity,
    postEntity,
    putEntity,
    deleteEntity
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

const deleteHandler = deleteEntity(entity);
router.delete("/:_id", deleteHandler);


module.exports = router;