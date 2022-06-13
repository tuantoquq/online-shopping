import { apiStatus } from '../constants/apiStatus.js';
import { httpStatus } from '../constants/httpStatus.js';
import CustomError from '../error/customError.js';
import Product from '../model/product.js';

const ProductService = {};

ProductService.findProductById = async (id) => {
    let product = await Product.findById(id);
    if (!product) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `Product not found with id: ${id}!`,
        );
    }
    return product;
};

ProductService.deleteById = async (productId) => {
    let product = await Product.findById(productId);
    if (!product) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `Product not found with id ${productId}`,
        );
    }
    //if exist => delete
    await Product.deleteOne({ _id: productId });
    return product;
};

export default ProductService;
