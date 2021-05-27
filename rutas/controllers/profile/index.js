const router = require('express').Router();
const Profile = require('./schema');
const { 
   // getEntity,
    getOneEntity,
   // postEntity,
    putEntity,
    deleteEntity
} = require('../genericos');
const entity = 'profile';

/*const getHandler = getEntity(entity);
router.get( '/', getHandler);*/
router.get("/", async (req, res) => {
    try {
      const profiles = await Profile.find();
      return res.status(200).json(profiles);
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ mensaje: error.message });
    }
});

 // const getOneHandler = getOneEntity(entity);
router.get('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const oneProfile = await Profile.findById(_id);
    if (oneProfile) {
      return res.status(200).json(oneProfile);
    }
    return res.status(404).json({ mensaje: "mascota no encontrada" });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ mensaje: error.message });
  }
});  

/*const postHandler = postEntity(entity);
router.post('/', postHandler);*/
router.post("/", async (req, res)=>{
    try {
      const profile = new Profile(req.body);
      await profile.save();
      return res.status(200).json(profile);  
    } catch (error) {
      console.log({error});
      return res.status(500).json({ mensaje: error.message });
    }
});

const putHandler = putEntity(entity);
router.put("/:_id", putHandler);

const deleteHandler = deleteEntity(entity);
router.delete("/:_id", deleteHandler);


module.exports = router;