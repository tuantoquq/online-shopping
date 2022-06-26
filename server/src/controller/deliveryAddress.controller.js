import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/customError.js';
import { DeliveryAddress } from '../model/index.js';
import DeliveryAddressService from '../service/deliveryAddress.service.js';

export const addDeliveryAddress = async (req, res) => {
    try {
        let customerId = req.userId;
        const { receiverName, phone, city, district, ward, details } = req.body;

        let checkAddress = await DeliveryAddressService.checkExistAddress({
            customerId: customerId,
            city: city,
            district: district,
            ward: ward,
            details: details,
            receiverName: receiverName,
            phone: phone,
        });

        if (checkAddress) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: 'Address has exist',
            });
        }

        let address = new DeliveryAddress({
            receiverName: receiverName,
            phone: phone,
            city: city,
            district: district,
            ward: ward,
            details: details,
            createAt: Date.now(),
            updateAt: Date.now(),
            customerId: customerId,
        });

        let saveAddress = await DeliveryAddressService.addDeliveryAddress(address);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'add delivery address successfully',
            data: saveAddress,
        });
    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.httpStatus).send({
                status: err.apiStatus,
                message: err.message,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

export const getDeliveryAddressById = async (req, res) => {
    try {
        let deliveryId = req.params.addressId;
        let deliveryFind = await DeliveryAddressService.findDeliveryAddressById(
            deliveryId,
        );
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'get delivery address successfully!',
            data: deliveryFind,
        });
    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.httpStatus).send({
                status: err.apiStatus,
                message: err.message,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

export const deleteDeliveryAddress = async (req, res) => {
    try {
        let addressId = req.params.addressId;
        let delivery = await DeliveryAddressService.deleteDeliveryAddressById(addressId);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'Delete delivery successfully!',
            data: delivery,
        });
    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.httpStatus).send({
                status: err.apiStatus,
                message: err.message,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

export const updateDeliveryAddress = async (req, res) => {
    try {
        let addressId = req.params.addressId;
        const dataUpdate = {};
        const listPros = ['receiverName', 'phone', 'city', 'district', 'ward', 'details'];

        for (let i = 0; i < listPros.length; i++) {
            let pro = listPros[i];
            // eslint-disable-next-line no-prototype-builtins
            if (req.body.hasOwnProperty(pro)) {
                dataUpdate[pro] = req.body[pro];
            }
        }
        dataUpdate['updateAt'] = Date.now();

        let delivery = await DeliveryAddressService.updateDeliveryAddress(
            addressId,
            dataUpdate,
        );

        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'update delivery address successfully!',
            data: delivery,
        });
    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.httpStatus).send({
                status: err.apiStatus,
                message: err.message,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};
