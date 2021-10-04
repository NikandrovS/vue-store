const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

exports.create = async (req, res) => {
    try {
        req.body.login = req.body.login.toLowerCase();
        const createdUser = await new User(req.body).save();
        res.send(createdUser);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating new user."
        });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne(
            { "login": req.body.login.toLowerCase() },
            ['_id', 'name', 'login', 'password']
        );

        if (!user) return res.sendStatus(401);

        const isMatch = await user.comparePassword(req.body.password);

        if (!isMatch) {
            return res.sendStatus(401);
        }

        delete user._doc.password;

        jwt.sign({ user }, 'secret-value', { expiresIn: '6d' }, (err, token) => {
            res.json({
                token,
                user
            });
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while logging in."
        });
    }
};

exports.authorization = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.sendStatus(403);
    }

    jwt.verify(bearerHeader.split(' ')[1], 'secret-value', (err, authData) => {
        if (err) {
            return res.sendStatus(403);
        }
        next();
    });
};
