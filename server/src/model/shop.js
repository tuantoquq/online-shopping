import mongoose from 'mongoose';

const ShopSchema = new mongoose.Schema(
    {
        shopperId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shopper',
            required: true,
        },
        shopName: {
            type: String,
            required: true,
            unique: true,
        },
        address: {
            type: String,
            required: false,
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
    },
);

const Shop = mongoose.model('Shop', ShopSchema);
export default Shop;
