import { apiStatus } from '../constants/apiStatus.js';
import { httpStatus } from '../constants/httpStatus.js';
import CustomError from '../error/customError.js';
import OrderProduct from '../model/orderProduct.js';

const OrderProductService = {};

OrderProductService.addOrderProduct = async (orderProduct) => {
    await orderProduct.save((err, orderProduct) => {
        if (err)
            throw new CustomError(
                httpStatus.INTERNAL_SERVER_ERROR,
                apiStatus.DATABASE_ERROR,
                `Error when save order product: ${err.message}`,
            );
        else return orderProduct;
    });
};

OrderProductService.findById = async (orderProductId) => {
    let orderProduct = await OrderProduct.findById(orderProductId);
    if (!orderProduct) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `OrderProduct not found with id ${orderProductId}`,
        );
    }
    return orderProduct;
};

export default OrderProductService;
