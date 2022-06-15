import { httpStatus, apiStatus } from '../constants/index.js';
import { DeliveryAddress } from '../model/deliveryAddress.js';

const deliveryController = {};

deliveryController.insertToDatabase = async (req, res) => {
    try {
        const {
            customerId,
            receiverName,
            phone,
            city,
            district,
            ward,
            details,
            createAt,
            updateAt,
        } = req.body;

        let address = await DeliveryAddress.findOne({
            customerId: customerId,
            city: city,
            district: district,
            ward: ward,
        });

        if (address) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Address has exist',
            });
        }

        address = new DeliveryAddress({
            receiverName: receiverName,
            phone: phone,
            city: city,
            district: district,
            ward: ward,
            details: details,
            createAt: createAt,
            updateAt: updateAt,
            customerId: customerId,
        });

        try {
            const addressSave = await address.save();
            res.status(httpStatus.CREATED).json({
                data: {
                    id: addressSave._id,
                    phone: phone,
                    city: city,
                    district: district,
                    ward: ward,
                    details: details,
                    createAt: createAt,
                    updateAt: updateAt,
                    customerId: customerId,
                },
            });
        } catch (e) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: e.message,
            });
        }
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
};

deliveryController.getDeliveryFromDatabase = async (req, res) => {
    try {
        let deliveryId = res.query.deliveryId;
        let deliveryFind = await DeliveryAddress.findById(deliveryId);

        if (deliveryFind == null) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: 'delivery not found',
            });
        }
        return res.status(httpStatus.OK).json({
            data: deliveryFind,
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
};

deliveryController.deleteDeliveryFromDatabase = async (req, res) => {
    try {
        let delivery = await DeliveryAddress.findByIdAndRemove(req.query.id);
        if (delivery == null) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Can't find delivery",
            });
        }

        return req.status(httpStatus.OK).json({
            message: 'Delete delivery done',
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
};

deliveryController.updateDeliveryFromDatabase = async (req, res) => {
    try {
        let deliveryId = req.deliveryId;
        const dataUpdate = {};
        const listPros = [
            'receiverName',
            'phone',
            'city',
            'district',
            'ward',
            'details',
            'createAt',
        ];

        for (let i = 0; i < listPros.length; i++) {
            let pro = listPros[i];
            // eslint-disable-next-line no-prototype-builtins
            if (req.body.hasOwnProperty(pro)) {
                dataUpdate[pro] = req.body[pro];
            }
        }
        dataUpdate['updateAt'] = Date.now();

        let delivery = await DeliveryAddress.findOneAndUpdate(
            { _id: deliveryId },
            dataUpdate,
        );

        if (!delivery) {
            return res
                .status(httpStatus.NOT_FOUND)
                .json({ message: "Can't find delivery" });
        }

        return res.status(httpStatus.OK).json({
            data: delivery,
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message,
        });
    }
};

export default deliveryController;
