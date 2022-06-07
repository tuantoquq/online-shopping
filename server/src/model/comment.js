import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        ratingStar: {
            type: Number,
            required: true,
        },
        images: {
            type: mongoose.Schema.Types.Array,
            required: false,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            required: true,
        },
    },
    {
        versionKey: false,
    },
);

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
