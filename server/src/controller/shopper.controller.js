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

export const updateAvatar = async (req, res, next) => {
    try {
        const file = req.file;
        let shopperId = req.userId;
        //check file extensions
        if (!file) {
            const error = new Error('Upload file again!');
            error.httpStatusCode = 400;
            return next(error);
        }
        const avtUrl = `${process.env.IMAGE_PRE_PATH}/${req.file.filename}`;
        let updateShopper = await ShopperService.updateAvatar(avtUrl, shopperId);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'update avatar successfully',
            data: updateShopper,
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
