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

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;
