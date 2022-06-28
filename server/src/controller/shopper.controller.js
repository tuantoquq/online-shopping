import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/customError.js';
import ShopperService from '../service/shopper.service.js';

export const getShopperProfile = async (req, res) => {
    try {
        const shopperId = req.userId;
        let shopper = await ShopperService.findShopperById(shopperId);
        shopper.password = '';
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'get shopper profile successfully',
            data: shopper,
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
