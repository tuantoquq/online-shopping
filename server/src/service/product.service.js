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

ProductService.getTop6Selling = async () => {
    let listTop6Product = await Product.find().sort({ soldHistory: -1 }).limit(6);
    return listTop6Product;
};

ProductService.getTop30RecommendProducts = async () => {
    let listProduct = await Product.find()
        .sort({ ratingCount: -1, ratingStar: -1 })
        .limit(30);
    return listProduct;
};

ProductService.getListProductOfShop = async (shopId, page, size) => {
    const limit = size ? size : 10;
    const offset = page ? (page - 1) * limit : 1;
    let condition = {shopId: shopId}
    let response = await Product.paginate(condition, {offset, limit}).then((data) => {
        return {
            totalProducts: data.totalDocs,
            products: data.docs,
            totalPages: data.totalPages,
            currentPage: parseInt(page ? page : offset)
        }
    })
    return response;
};

ProductService.addProduct = async (productRequest) => {
    await productRequest.save(function (err, product) {
        if (err)
            throw new CustomError(
                httpStatus.INTERNAL_SERVER_ERROR,
                apiStatus.DATABASE_ERROR,
                `Error when save product: ${err.message}`,
            );
        else {
            return product;
        }
    });
    return productRequest;
};

ProductService.updateProduct = async (productRequest, productId) => {
    let updateProduct = await Product.findByIdAndUpdate(productId, productRequest, {
        new: true,
    });
    if (!updateProduct) {
        throw new CustomError(
            httpStatus.INTERNAL_SERVER_ERROR,
            apiStatus.DATABASE_ERROR,
            `Product not found with id: ${productId}`,
        );
    }
    return updateProduct;
};

ProductService.deleteProduct = async (productId) => {
    let product = await Product.findByIdAndDelete(productId);
    if (!product) {
        throw new CustomError(
            httpStatus.INTERNAL_SERVER_ERROR,
            apiStatus.DATABASE_ERROR,
            `Product not found with id: ${productId}`,
        );
    }
    return product;
};
ProductService.getLastProduct = async () => {
    return await Product.find().sort({ productId: -1 }).limit(1);
};

ProductService.checkExistCode = async (code) => {
    let product = await Product.find({ codes: code });
    if (product.length > 0) {
        return true;
    } else return false;
};
export default ProductService;
