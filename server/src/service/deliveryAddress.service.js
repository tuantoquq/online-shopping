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

DeliveryAddressService.addDeliveryAddress = async (address) => {
    await address.save((err, address) => {
        if (err)
            throw new CustomError(
                httpStatus.INTERNAL_SERVER_ERROR,
                apiStatus.DATABASE_ERROR,
                `Error when save delivery address: ${err.message}`,
            );
        else return address;
    });
};

DeliveryAddressService.getListAddressByCustomerId = async (customerId) => {
    let listAddress = await DeliveryAddress.find({ customerId: customerId });
    return listAddress;
};

DeliveryAddressService.deleteDeliveryAddressById = async (addressId) => {
    let address = await DeliveryAddress.findByIdAndDelete(addressId);
    if (!address) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `Delivery address not found with id ${addressId}`,
        );
    }
    return address;
};

DeliveryAddressService.checkExistAddress = async (addressInfo) => {
    let checkAddress = await DeliveryAddress.find(addressInfo);
    if (checkAddress.length == 0) {
        return false;
    }
    return true;
};

DeliveryAddressService.updateDeliveryAddress = async (addressId, updateInfo) => {
    let address = await DeliveryAddress.findByIdAndUpdate(addressId, updateInfo, {
        new: true,
    });
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
