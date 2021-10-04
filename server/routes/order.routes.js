module.exports = (app) => {
    const order = require('../controllers/order.controller');
    const user = require('../controllers/user.controller');

    app.post('/newOrder', order.create);

    app.put('/editOrder', user.authorization, order.edit);

    app.put('/setStatus', user.authorization, order.status);

    app.get('/limitOrders', user.authorization, order.limitOrders);

    app.get('/ordersSearch', user.authorization, order.ordersSearch);
};
