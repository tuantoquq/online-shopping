import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
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
        status: {
            type: Number,
            default: 0,
            required: true
        }
    },
    {
        versionKey: false,
    },
);
ShopSchema.plugin(mongoosePaginate);
const Shop = mongoose.model('Shop', ShopSchema);
export default Shop;
