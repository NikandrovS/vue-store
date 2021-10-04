module.exports = (app) => {
    const user = require('../controllers/user.controller');

    app.post('/create-user', user.create);
    app.post('/login', user.login);
}
