import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    updateAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
});
const Category = mongoose.model('Category', CategorySchema);
export default Category;
