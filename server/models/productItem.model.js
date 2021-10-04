const mongoose = require('mongoose');

const ProductItemSchema = mongoose.Schema({
    code: { type: String, index: true  },
    name: { type: String, index: true },
    color: "objectId",
    sizes: Array,
    price: Number,
    title: Boolean,
    images: Array,
    published: { type: Boolean, default: 'true' },
    deleted: { type: Boolean, default: 'false' }
}, {
    versionKey: false
});

ProductItemSchema.index({ code: 'text', name: 'text' })


module.exports = mongoose.model('Item', ProductItemSchema);
