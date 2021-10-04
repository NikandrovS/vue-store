const ProductColor = require('../models/productColors.model.js');

exports.create = async (req, res) => {
    try {
        const color = await new ProductColor({
            color: req.body.color,
            hex: req.body.hex
        }).save();

        res.send(color);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Color."
        });
    }

};

exports.findAll = async (req, res) => {
    try {
        const colors = await ProductColor
            .find({ deleted: false })
            .select(['-deleted']);

        res.send(colors);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving colors."
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const color = await ProductColor.findById(req.params.colorId);
        res.send(color);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving color with id " + req.params.colorId
        });
    }
};

exports.update = async (req, res) => {
    try {
        const color = await ProductColor.findByIdAndUpdate(req.params.colorId, {
            color: req.body.color,
            hex: req.body.hex
        }, { new: true });

        res.send(color);
    } catch (err) {
        res.status(500).send({
            message: "Error updating color with id " + req.params.colorId
        });
    }

};

exports.delete = async (req, res) => {
    try {
        const color = await ProductColor.findByIdAndUpdate(req.params.colorId, {
            deleted: true
        });
        if (!color) {
            return res.status(404).send({
                message: "Color not found with id " + req.params.colorId
            });
        }
        res.send({ message: "Color deleted successfully!" });
    } catch (err) {
        res.status(500).send({
            message: "Could not delete color with id " + req.params.colorId
        });
    }
};
