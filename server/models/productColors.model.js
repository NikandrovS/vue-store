const mongoose = require('mongoose');

const ProductColorSchema = mongoose.Schema({
    color: { type:String, required: true },
    hex: { type:String, required: true },
    deleted: { type: Boolean, default: 'false' }
}, {
    versionKey: false
});

module.exports = mongoose.model('Color', ProductColorSchema);
