const express = require('express');
const { crear } = require('./data-handler');

const app = express();
const port = 5000;

app.get('/', (_req, res) => {
    res.send('la API está corriendo exitósamente');
})
app.get('/profile', (_req, res) => {
    const userProfile = [
        {
            firstName:'Céser', 
            lastName:'Córdoba', 
            email:'cordobacesar29@gmail.com ',
            password:'test123',
        }
    ]
    res.status(200).json(userProfile);
});

app.post('/profile', async (_req, res) =>{
    const newProfile = await crear({
        directorioEntidad:'profile',
        nombreArchivo:'profile1',
        datosGuardar:{
            firstName:'Céser', 
            lastName:'Córdoba', 
            email:'cordobacesar29@gmail.com ',
            password:'',
        },
    });
    res.status(200).json(newProfile);
});
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});