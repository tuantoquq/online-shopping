import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/customError.js';
import CustomerService from '../service/customer.service.js';

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
