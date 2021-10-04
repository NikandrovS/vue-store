const ProductItem = require('../models/productItem.model');
const ProductColors = require('../models/productColors.model');
const ProductSizes = require('../models/productSizes.model')

module.exports = {
    removeTitleValue,
    appendColor,
    appendColors,
    appendSizes
};

async function removeTitleValue(code) {
    try {
        await ProductItem.updateOne({ code: code, title: true }, { $unset: { title: 1 } });
    } catch (e) {
        console.log(e);
    }
}

async function appendColor(product) {
    try {
        const result = await ProductColors.findById(product.color);
        product._doc.color = result.color;
        product._doc.hex = result.hex;
    } catch (e) {
        console.log(e);
    }
}

async function appendColors(items) {
    try {
        const colors = await ProductColors.find();
        for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < colors.length; j++) {
                if (items[i].color.toString() === colors[j]._id.toString()) {
                    items[i]._doc.color = colors[j].color;
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}

async function appendSizes(item) {
    try {
        const sizes = await ProductSizes.find();
        const sizesArray = []
        for (let i = 0; i < item.sizes.length; i++) {
            for (let j = 0; j < sizes.length; j++) {
                if (item.sizes[i].toString() === sizes[j]._id.toString()) {
                    sizesArray.push(sizes[j].size);
                }
            }
        }
        item._doc.sizes = sizesArray
    } catch (e) {
        console.log(e);
    }
}
