const path = require('path');
const fs = require('fs');

const ProductItem = require('../models/productItem.model.js');
const ProductUtils = require('../utils/productItem.utils');

exports.create = async (req, res) => {
    try {
        async function checkTitles() {
            const result = await ProductItem.findOne({ code: req.body.code });
            if (!result) {
                return true;
            }
            return undefined;
        }

        const check = await checkTitles();

        if (req.body.title && !check) {
            await ProductUtils.removeTitleValue(req.body.code);
        }

        const item = new ProductItem({
            code: req.body.code,
            name: req.body.name,
            color: req.body.color,
            sizes: req.body.sizes || [],
            price: req.body.price,
            title: req.body.title || check,
            images: req.body.images
        });

        const result = await item.save();

        res.send(result);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the item."
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const items = await ProductItem
            .find({ deleted: false })
            .select(['-deleted']);

        await ProductUtils.appendColors(items);
        res.send(items);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving items."
        });
    }
};

exports.findTitles = async (req, res) => {
    try {
        const items = await ProductItem.find({title: true});
        res.send(items);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving items."
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const item = await ProductItem.findById(req.params.itemId);
        await ProductUtils.appendColor(item);
        if (item.sizes.length) {
            await ProductUtils.appendSizes(item);
        }

        res.send(item);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving item with id " + req.params.itemId
        });
    }
};

exports.findByName = async (req, res) => {
    try {
        let items = await ProductItem
            .find({ $text: { $search: `"${ req.query.name }"` }, deleted: false })

        await ProductUtils.appendColors(items);
        for (const item of items) {
            await ProductUtils.appendSizes(item);
        }

        res.send(items);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving item with code " + req.query.code
        });
    }
};

exports.findByCode = async (req, res) => {
    try {
        let items = await ProductItem
            .find({ $text: { $search: `"${ req.query.code }"` }, deleted: false })
            .sort({ code: 1 })
            .limit(10);

        await ProductUtils.appendColors(items);
        for (const item of items) {
            await ProductUtils.appendSizes(item);
        }

        res.send(items);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving item with code " + req.query.code
        });
    }
};

exports.update = async (req, res) => {
    let updatedItem = {};
    const exceptions = ['title'];
    try {
        if (req.body.title) {
            await ProductUtils.removeTitleValue(req.body.code);
            updatedItem.title = true;
        }

        for (const [key, value] of Object.entries(req.body)) {
            if (exceptions.includes(key)) continue;
            updatedItem[key] = value;
        }
        const item = await ProductItem.findByIdAndUpdate(req.params.itemId, updatedItem, { new: true });
        res.send(item);
    } catch (err) {
        res.status(500).send({
            message: "Error updating color with id " + req.params.itemId
        });
    }
};

exports.restore = async (req, res) => {
    try {
        await ProductItem.findByIdAndUpdate(req.params.itemId, { deleted: false });
        res.send({ message: "Item restored successfully!" });
    } catch (err) {
        res.status(500).send({
            message: "Item not delete color with id " + req.params.itemId
        });
    }
};

exports.delete = async (req, res) => {
    try {
        await ProductItem.findByIdAndUpdate(req.params.itemId, { deleted: true });
        res.send({ message: "Item deleted successfully!" });
    } catch (err) {
        res.status(500).send({
            message: "Item not delete color with id " + req.params.itemId
        });
    }
};

exports.uploadImage = (req, res) => {
    const fileData = req.file;

    if (!fileData) {
        res.status(400).send("Ошибка при загрузке файла");
        return;
    }
    res.status(200).send(fileData.filename);
};

exports.deleteImage = (req, res) => {
    const filePath = path.join(__dirname, `../uploads/products/${ req.query.filename }`);

    fs.unlink(filePath, function (err) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(200).send("ok");
    });
};
