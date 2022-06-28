import { Shop } from '../model/index.js';
import CustomError from '../error/customError.js';
import { httpStatus } from '../constants/httpStatus.js';
import { apiStatus } from '../constants/apiStatus.js';

const ShopService = {};

ShopService.getListShopWithPagination = async (page, size, name) => {
    const limit = size ? size : 10;
    const offset = page ? page * limit : 1;
    let condition = name
        ? { shopName: { $regex: new RegExp(`.*${name}.*`), $options: 'i' } }
        : {};

    let response = await Shop.paginate(condition, { offset, limit }).then((data) => {
        return {
            totalShops: data.totalDocs,
            listShop: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1,
        };
    });

    return response;
};

ShopService.findShopById = async (shopId) => {
    let shop = await Shop.findById(shopId);
    if (!shop) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `Shop not found with id ${shopId}`,
        );
    }
    return shop;
};

ShopService.findShopByShopperId = async (shopperId) => {
    let shop = await Shop.findOne({ shopperId: shopperId });
    if (!shop) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `Shop not found with shopper id ${shopperId}`,
        );
    }
    return shop;
};

export default ShopService;
