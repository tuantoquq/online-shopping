import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    orderStatus: {
        type: Number, // 0: created, 1: accepted, 2: finished, -1: canceled
        required: true,
        default: 0,
    },
    receiverName: {
        type: String,
        required: true,
    },
    reasonReject: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true,
    },
    deliveryAddress: {
        type: String,
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
