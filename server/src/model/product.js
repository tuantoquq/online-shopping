import mongoose from 'mongoose';
// import mongooseFloat from 'mongoose-float'
// import Float from mongooseFloat.loadType(mongoose)

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    longDescription: {
        type: String,
        required: true,
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true,
    },
    soldHistory: {
        type: {},
        default: null,
        required: false,
    },
    imageUrls: {
        type: Array,
        default: null,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    sizes: {
        type: Number,
        required: true,
    },
    ratingStar: {
        type: Number,
        default: 0,
        required: true,
    },
    ratingCount: {
        type: Number,
        default: 0,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    updateAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;