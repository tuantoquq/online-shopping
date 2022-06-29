import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    longDescription: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
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
    codes: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    sizes: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    ratingStart: {
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
ProductSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', ProductSchema);
export default Product;
