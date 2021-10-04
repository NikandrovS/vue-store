const OrderSchema = require('../models/order.model.js');

exports.create = async (req, res) => {
    req.body.order = await OrderSchema.countDocuments() + 1;
    try {
        const data = await new OrderSchema(req.body).save();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating new order.",
        });
    }
};

exports.edit = async (req, res) => {
    try {
        const data = await OrderSchema.findByIdAndUpdate(req.query.id, req.body, { new: true });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating new order.",
        });
    }
};

exports.status = async (req, res) => {
    try {
        const data = await OrderSchema.findByIdAndUpdate(req.body.id, {
            status: req.body.status,
        }, { new: true });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating new order.",
        });
    }
};

exports.limitOrders = async (req, res) => {
    try {
        let filter = {};
        req.query.filter !== 'all' ? filter = { status: req.query.filter } : "";

        const result = await OrderSchema
            .find(filter)
            .sort({ 'order': -1 })
            .skip(Number(req.query.skip) || 0)
            .limit(15);
        res.send(result);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while getting orders.",
        });
    }
};
exports.ordersSearch = async (req, res) => {
    try {
        let result = [];

        if (!isNaN(req.query.search)) {
            result = await OrderSchema.find({ 'order': req.query.search });
        }

        const items = await OrderSchema
            .find({ $or: [{ '$text': { $search: `"${ req.query.search }"` } }, { 'phone': req.query.search }] })
            .sort({ order: -1 })
            .limit(9);

        if (items.length) result = result.concat(items);

        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Some error occurred while getting orders.",
        });
    }
};
