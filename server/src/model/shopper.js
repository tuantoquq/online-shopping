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
        phone: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            name: 'first_name',
            required: true,
        },
        lastName: {
            type: String,
            name: 'last_name',
            required: true,
        },
        dateOfBirth: {
            type: String,
            name: 'date_of_birth',
        },
        gender: {
            //MALE, FEMALE, OTHER
            type: String,
        },
        avatarUrl: {
            type: String,
            name: 'avatar_url',
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
            type: Number, // 0: waiting , 1: accepted,  2: denied
            required: true,
        },
        createdAt: {
            type: Date,
            name: 'created_at',
            default: Date.now(),
            required: true,
        },
        updatedAt: {
            type: Date,
            name: 'updated_at',
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
