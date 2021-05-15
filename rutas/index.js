const register = require('./controllers/register');
const profile = require('./controllers/profile');

module.exports = (app) =>{ 
    app.use('/register', register);   
    app.use('/profile', profile);
};