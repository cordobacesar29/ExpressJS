const register = require('./register');
const profile = require('./profile');

module.exports = (app) =>{ 
    app.use('/register', register);   
    app.use('/profile', profile);
};