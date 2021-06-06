const router = require('express').Router();
const Register = require('./schema');
const { 
    //getEntity, 
    //getOneEntity, 
    //postEntity,
    //putEntity,
    //deleteEntity
} = require('../genericos');
const entity = 'register';

//const getHandler = getEntity(entity);
router.get( '/', async (_req, res) => {
    try {
      const registers = await Register.find();
      return res.status(200).json(registers);
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ mensaje: error.message });
    }
});

//const getOneHandler = getOneEntity(entity);
router.get('/:_id', async (req, res) => {
    try {
      const { _id } = req.params;
      const oneRegister = await Register.findById(_id);
      if (oneRegister) {
        return res.status(200).json(oneRegister);
      }
      return res.status(404).json({ mensaje: "registro no encontrada" });
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ mensaje: error.message });
    }
}); 

//const postHandler = postEntity(entity);
router.post("/", async (req, res)=>{
    try {
      const register = new Register(req.body);
      await register.save();
      return res.status(200).json(register);  
    } catch (error) {
      console.log({error});
      return res.status(500).json({ mensaje: error.message });
    }
});

//const putHandler = putEntity(entity);
router.put("/:_id", async (req, res) => {
    try {
      const { _id = null } = req.params;
      const {_id: id, ...newDates } = req.body;
      if(!_id) {
        return res.status(400).json({ mensaje: 'falta id' });  
      } 
      const registerUpdate = await Register.findOneAndUpdate({_id}, {$set : newDates}, {new:true, runValidators:true});
      return res.status(200).json(registerUpdate);
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ mensaje: error.message });
    }
});

//const deleteHandler = deleteEntity(entity);
router.delete("/:_id", async (req, res) => {
    try {
      const { _id = null } = req.params;
      if (!_id) {
        return res.status(400).json({ mensaje: "falta id" });
      }
      const registerDelete = await Register.remove({_id});
      console.log({registerDelete});
      return res.status(204).send();
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ mensaje: error.message });
    }
});


module.exports = router;