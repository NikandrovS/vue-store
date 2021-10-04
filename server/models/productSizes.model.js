const mongoose = require('mongoose');

const ProductSizeSchema = mongoose.Schema({
    size: { type:String, required: true },
    deleted: { type: Boolean, default: 'false' }
}, {
    versionKey: false
});

module.exports = mongoose.model('Sizes', ProductSizeSchema);
