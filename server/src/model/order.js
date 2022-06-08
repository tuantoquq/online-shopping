import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true,
    },
    orderStatus: {
        type: Number, // 0: created, 1: accepted, 2: finished,
        required: true,
        default: 0,
    },
    receiverName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    deliveryAddressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryAddress',
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
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
