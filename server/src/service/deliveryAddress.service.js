import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/customError.js';
import DeliveryAddress from '../model/deliveryAddress.js';

const DeliveryAddressService = {};

DeliveryAddressService.findDeliveryAddressById = async (addressId) => {
    let address = await DeliveryAddress.findById(addressId);
    if (!address) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `Delivery address not found with id ${addressId}`,
        );
    }
    return address;
};

export default DeliveryAddressService;
