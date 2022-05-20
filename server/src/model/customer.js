import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema(
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
        },
        avatarUrl: {
            type: String,
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

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;
