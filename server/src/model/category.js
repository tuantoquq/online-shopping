import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        created_at:{
            type: Date,
            default: Date.now(),
            required: true
        },
        update_at:{
            type: Date, 
            default: Date.now(),
            required: true
        }
    }
)
const Category = mongoose.model('Category', CategorySchema)
export default Category 