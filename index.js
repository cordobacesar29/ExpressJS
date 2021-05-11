const express = require('express');

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
            password:'',
        }
    ]
    res.status(200).json(

    );
    res.send('la API está corriendo exitósamente');
})
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})