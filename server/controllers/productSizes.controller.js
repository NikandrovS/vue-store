const ProductSize = require('../models/productSizes.model.js');

exports.create = async (req, res) => {
    try {
        const size = await new ProductSize({
            size: req.body.size
        }).save();

        res.send(size);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the size."
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const sizes = await ProductSize
            .find({ deleted: false })
            .select(['-deleted']);

        res.send(sizes);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving sizes."
        });
    }
};

exports.delete = async (req, res) => {
    try {
        await ProductSize.findByIdAndUpdate(req.params.sizeId, {
            deleted: true
        });
        res.send({ message: "Size deleted successfully!" });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting size with id " + req.params.sizeId
        });
    }
};
