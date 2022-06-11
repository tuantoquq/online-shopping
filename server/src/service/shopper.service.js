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

ShopperService.addShopper = async (shopper) => {
    await shopper.save((err, shopper) => {
        if (err) throw Error;
        else return shopper;
    });
};

export default ShopperService;