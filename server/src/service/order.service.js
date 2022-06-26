import { apiStatus } from '../constants/apiStatus.js';
import { httpStatus } from '../constants/httpStatus.js';
import CustomError from '../error/customError.js';
import Order from '../model/order.js';

const OrderService = {};

OrderService.addOrder = async (orderRequest) => {
    await orderRequest.save(function (err, order) {
        if (err)
            throw new CustomError(
                httpStatus.INTERNAL_SERVER_ERROR,
                apiStatus.DATABASE_ERROR,
                `Error when save order: ${err.message}`,
            );
        else {
            return order;
        }
    });
    return orderRequest;
};

OrderService.getListOrderByCustomer = async (customerId) => {
    let listOrder = await Order.find({ customerId: customerId });
    return listOrder;
};

OrderService.updateOrder = async (orderId, orderStatus) => {
    let order = await Order.findByIdAndUpdate(
        orderId,
        { orderStatus: orderStatus },
        { new: true },
    );
    if (!order) {
        throw new CustomError(
            httpStatus.INTERNAL_SERVER_ERROR,
            apiStatus.DATABASE_ERROR,
            `Order not found with id: ${orderId}`,
        );
    }
    return order;
};

OrderService.getListOrderByCustomerAndStatus = async (customerId, status) => {
    let listOrder = await Order.find({ customerId: customerId, orderStatus: status });
    return listOrder;
};
export default OrderService;
