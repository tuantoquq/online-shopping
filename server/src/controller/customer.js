import { httpStatus, apiStatus } from "../constants/index.js";
import { Customer } from "../model/index.js";

export const getCustomerProfile = async (req, res) => {
    try{
        const customerId = req.userId;
        let customer = await Customer.findById(customerId);
        if(!customer) {
            return res.status(httpStatus.NOT_FOUND).send({
                status: apiStatus.AUTH_ERROR,
                message: 'User not found!'
            });
        }
        customer.password = "";
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'get customer profile successfully',
            data: customer
        });
    }catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
}