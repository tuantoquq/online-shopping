import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/customError.js';
import OrderService from '../service/order.service.js';
import OrderProductService from '../service/orderProduct.service.js';
import ShopService from '../service/shop.service.js';
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


export const getAllShopperWithState = async (req, res) => {
    try{
        let state = req.query.state
        console.log(state)
        let shopper = await ShopperService.getAllWithState(state)
        let message
        if(!shopper){
            message = "Empty message"
        }
        else{
            message = "Success"
        }
        return res.status(httpStatus.OK).json({
            message: message,
            data: shopper
        })
    }
    catch(err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }

}

export const getShopInformationOfShopper = async (req, res) => {
    try{
        let shopperId = req.userId;
        let shop = await ShopService.findShopByShopperId(shopperId);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: "get shop info of shopper successfully",
            data: shop
        });
    }catch(err){
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
}

export const getAllOrderWithStatus = async (req, res) => {
    try{
        let shopperId = req.userId;
        let status = req.query.status;
        let shop = await ShopService.findShopByShopperId(shopperId);

        if(status === 2) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.SUCCESS,
                message: "You can only manage order in status CREATE, ACCEPT and CANCEL",
            });
        }

        let listOrder = await OrderService.getListOrderByShopId(shop._id, status);
        for (let i = 0; i< listOrder.length; i++){
            listOrder[i] = listOrder[i].toObject();
            let listOrderProduct = await OrderProductService.getListOrderProductOfOrder(listOrder[i]._id);
            console.log(`index: ${i}: orderId: ${listOrder[i]._id}` ,listOrderProduct.length);
            listOrder[i].orderProduct = listOrderProduct;
        }
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: "get list order with status successfully",
            data: listOrder
        });
    }catch(err){
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
}

