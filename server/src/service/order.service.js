import { apiStatus } from '../constants/apiStatus.js';
import { httpStatus } from '../constants/httpStatus.js';
import CustomError from '../error/customError.js';
import Order from '../model/order.js';

const OrderService = {};

OrderService.addOrder = async (orderRequest) => {
    await orderRequest.save((err, order) => {
        if (err)
            throw new CustomError(
                httpStatus.INTERNAL_SERVER_ERROR,
                apiStatus.DATABASE_ERROR,
                `Error when save order: ${err.message}`,
            );
        else return order;
    });
};

OrderService.getListOrderByCustomer = async (customerId) => {
    let listOrder = await Order.find({ customerId: customerId });
    return listOrder;
};

export default OrderService;
