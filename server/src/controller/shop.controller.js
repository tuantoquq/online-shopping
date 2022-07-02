import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/customError.js';
import ProductService from '../service/product.service.js';
import ShopService from '../service/shop.service.js';

export const getAllShop = async (req, res) => {
    try {
        let size = req.query.limit;
        let page = req.query.offset;
        if(page <= 0 || size <= 0 ) {
            return res.status(httpStatus.BAD_REQUEST).send({
              status: apiStatus.INVALID_PARAM,
              message: "Limit and Offset must be greater than 0"
            });
          }
        let name = req.query.name;

        let listShop = await ShopService.getListShopWithPagination(page, size, name);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'get list shop successfully',
            data: listShop,
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

export const getShopInfo = async (req, res) => {
    try {
        let shopId = req.query.shopId;
        let shop = await ShopService.findShopById(shopId);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'get shop information successfully!',
            data: shop,
        });
    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.httpStatus).send({
                status: err.apiStatus,
                message: err.message,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

export const getListProductOfShop = async (req, res) => {
    try {
        let size = req.query.limit;
        let page = req.query.offset;
        if(page <= 0 || size <= 0 ) {
            return res.status(httpStatus.BAD_REQUEST).send({
              status: apiStatus.INVALID_PARAM,
              message: "Limit and Offset must be greater than 0"
            });
          }
        let shopId = req.query.shopId;
        let svResponse = await ProductService.getListProductOfShop(shopId, page, size);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'get list products of shop successfully',
            data: svResponse,
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};
