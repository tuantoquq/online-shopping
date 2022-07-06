import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/customError.js';
import CustomerService from '../service/customer.service.js';
import OrderService from '../service/order.service.js';
import Customer from '../model/customer.js';

export const getCustomerProfile = async (req, res) => {
    try {
        const customerId = req.userId;
        let customer = await CustomerService.findCustomerById(customerId);
        customer.password = '';
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'get customer profile successfully',
            data: customer,
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

export const cancelOrder = async (req, res) => {
    try {
        const orderId = req.query.orderId;
        let updateOrder = await OrderService.updateOrder(orderId, -2);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'cancel order successfully',
            data: updateOrder,
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

export const updateAvatar = async (req, res, next) => {
    try {
        const file = req.file;
        let customerId = req.userId;
        //check file extensions
        if (!file) {
            const error = new Error('Upload file again!');
            error.httpStatusCode = 400;
            return next(error);
        }
        const avtUrl = `${process.env.IMAGE_PRE_PATH}/${req.file.filename}`;
        let updateCustomer = await CustomerService.updateAvatar(avtUrl, customerId);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'update avatar successfully',
            data: updateCustomer,
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


export const getAllCustomer = async (req, res) => {
    try{
        let customer = await Customer.find()
        let message
        if(!customer){
            message = "Empty message"
        }
        else{
            message = "Success"
        }
        return res.status(httpStatus.OK).json({
            message: message,
            data: customer
        })
    }
    catch(err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }

}