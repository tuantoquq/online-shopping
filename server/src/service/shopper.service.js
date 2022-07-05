import { apiStatus } from '../constants/apiStatus.js';
import { httpStatus } from '../constants/httpStatus.js';
import CustomError from '../error/customError.js';
import Shopper from '../model/shopper.js';

const ShopperService = {};

ShopperService.findShopperById = async (id) => {
    let shopper = await Shopper.findById(id);
    if (!shopper) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            'Shopper not found!',
        );
    }
    return shopper;
};

ShopperService.findShopperByEmail = async (email) => {
    let shopper = await Shopper.findOne({ email: email });
    if (!shopper) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `Shopper not found with email: ${email}!`,
        );
    }
    return shopper;
};

ShopperService.getAllWithState = async (state) => {
    let shoppers = await Shopper.find({state: state})
    return shoppers;
}

ShopperService.addShopper = async (shopper) => {
    await shopper.save((err, shopper) => {
        if (err)
            throw new CustomError(
                httpStatus.INTERNAL_SERVER_ERROR,
                apiStatus.DATABASE_ERROR,
                `Error when save shopper: ${err.message}`,
            );
        else return shopper;
    });
};

ShopperService.updateAvatar = async (avtUrl, shopperId) => {
    let response = await Shopper.findByIdAndUpdate(
        { _id: shopperId },
        { avatarUrl: avtUrl },
        { new: true },
    );
    if (!response) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `Shopper not found with id: ${shopperId}!`,
        );
    }
    return response;
};

ShopperService.onOffBlockShopper = async (email, state) => {
    let shopper = await Shopper.findOneAndUpdate({email: email}, {isBlock: state}, {new: true});
    if(!shopper){
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `Shopper not found with email: ${email}!`,
        );
    }
    return shopper;
}

ShopperService.changeStateShopper = async (shopperId, state) => {
    let shopper = await Shopper.findByIdAndUpdate(shopperId, {state: state}, {new: true});
    if(!shopper){
        throw new CustomError(
            httpStatus.INTERNAL_SERVER_ERROR,
            apiStatus.INVALID_PARAM,
            `Did not find shopper with id: ${shopperId}`
        );
    }
}
export default ShopperService;
