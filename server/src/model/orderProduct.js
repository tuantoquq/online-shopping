import mongoose from 'mongoose';

const OrderProductSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        productName: {
            type: String,
            required: true,
        },
        size: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
        currentPrice: {
            type: Number,
            required: true,
        },
        productImageUrl: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
        collection: 'order_products',
    },
);

const OrderProduct = mongoose.model('OrderProduct', OrderProductSchema);
export default OrderProduct;
