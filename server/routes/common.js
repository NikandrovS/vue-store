const express = require('express');
const router = express.Router();
// const user = require('../controllers/user.controller');

require('../routes/user.routes.js')(router);

// middleware that is specific to all routes bellow
// router.use(user.authorization);

require('../routes/productColors.routes.js')(router);
require('../routes/productSizes.routes.js')(router);
require('../routes/productItem.routes.js')(router);
require('./order.routes.js')(router);

router
    .get('/', function (req, res) {
        res.send('Home page');
    });

module.exports = router;
