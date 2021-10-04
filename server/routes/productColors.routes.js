module.exports = (app) => {
    const colors = require('../controllers/productColors.controller.js');
    const user = require('../controllers/user.controller');

    // Create a new color
    app.post('/productColors', user.authorization, colors.create);

    // Retrieve all colors
    app.get('/productColors', colors.findAll);

    // Retrieve a single color with colorId
    app.get('/productColors/:colorId', colors.findOne);

    // Update a color with colorId
    app.put('/productColors/:colorId', user.authorization, colors.update);

    // Delete a color with colorId
    app.delete('/productColors/:colorId', user.authorization, colors.delete);
};
