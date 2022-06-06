import mongoose, { Schema } from "mongoose";

const DeliveryAddressSchema = new mongoose.Schema(
    {
        recieverName: {
            type: String, 
            required: true
        },
        phone: {
            type: String, 
            required: true
        },
        city: {
            type: String,
            required: true
        },
        district: {
            type: String, 
            required: true
        },
        ward: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true
        },
        createAt: {
            type: Date,
            default: Date.now(),
            required: true
        },
        updateAt: {
            type: Date,
            default: Date.now(),
            required: true
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        }

    }
)

const DeliveryAddress = mongoose.Model('DeliveryAddress', DeliveryAddressSchema)
export default DeliveryAddress