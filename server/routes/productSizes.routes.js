module.exports = (app) => {
    const sizes = require('../controllers/productSizes.controller');
    const user = require('../controllers/user.controller');

    app.post('/productSizes', user.authorization, sizes.create);

    app.get('/productSizes', sizes.findAll);

    app.delete('/productSizes/:sizeId', user.authorization, sizes.delete);
}
