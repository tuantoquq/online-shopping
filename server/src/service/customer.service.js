import { apiStatus } from '../constants/apiStatus.js';
import { httpStatus } from '../constants/httpStatus.js';
import CustomError from '../error/customError.js';
import { Customer } from '../model/index.js';

const CustomerService = {};
CustomerService.findCustomerById = async (id) => {
    let customer = await Customer.findById(id);
    if (!customer) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            'Customer not found!',
        );
    }
    return customer;
};

CustomerService.findCustomerByEmail = async (email) => {
    let customer = await Customer.findOne({ email: email });
    if (!customer) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `Customer not found with email: ${email}!`,
        );
    }
    return customer;
};

CustomerService.addCustomer = async (customer) => {
    await customer.save((err, customer) => {
        if (err)
            throw new CustomError(
                httpStatus.INTERNAL_SERVER_ERROR,
                apiStatus.DATABASE_ERROR,
                `Error when save customer: ${err.message}`,
            );
        else return customer;
    });
};
export default CustomerService;
