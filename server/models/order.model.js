const mongoose = require('mongoose');

// mongoose.set('debug', true); // debug logs

const OrderSchema = mongoose.Schema({
    order: { type: Number, required: true },
    name: { type: String, index: true, required: true },
    instagram: { type: String, index: true },
    phone: { type: String, index: true, required: true },
    email: String,
    address: String,
    city: String,
    country: String,
    postcode: String,
    delivery: String,
    desc: String,
    wishes: { type: String, default: "" },
    items: Array,
    discount: Number,
    percentage: Boolean,
    status: { type: String, default: "new" }
}, { versionKey: false, timestamps: true });

OrderSchema.index({ name: 1, phone: 1, instagram: 1 });

module.exports = mongoose.model('Order', OrderSchema);
