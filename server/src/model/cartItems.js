import mongoose from 'mongoose';

const CartItemsSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        size: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
            default: {},
        },
        count: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            required: true,
        },
        updatedAt: {
            type: Date,
            default: Date.now(),
            required: true,
        },
    },
    {
        versionKey: false,
        collection: 'cart_items',
    },
);

const CartItems = mongoose.model('CartItems', CartItemsSchema);
export default CartItems;
