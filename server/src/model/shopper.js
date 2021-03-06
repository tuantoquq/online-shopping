import mongoose from 'mongoose';

const ShopperSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: String,
        },
        gender: {
            //MALE, FEMALE, OTHER
            type: String,
            required: true,
        },
        avatarUrl: {
            type: String,
            default: 'avt_default.png',
            required: true,
        },
        cccd: {
            type: String,
            required: true,
        },
        issueDate: {
            type: String,
            required: true,
        },
        issuePlace: {
            type: String,
            required: true,
        },
        state: {
            type: Number, // 0: waiting , 1: accepted,  -1: denied
            required: true,
        },
        isBlock: {
            type: Number, // 0: active , 1: block
            required: true,
            default: 0
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

const Shopper = mongoose.model('Shopper', ShopperSchema);
export default Shopper;
