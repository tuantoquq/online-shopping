import CustomError from "../error/customError.js";
import { httpStatus, apiStatus, RoleConstants } from "../constants/index.js";
import CustomerService from "../service/customer.service.js";
import ShopperService from "../service/shopper.service.js";
import AdminService from "../service/admin.service.js";
import bcrypt from 'bcryptjs';

const {hashSync, compareSync} = bcrypt; 

export const onOffBlockUser = async (req, res) => {
    try{
        let email = req.body.email;
        let role = req.body.role;
        let state = parseInt(req.query.isBlock);
        if(state !== 1 && state !== 0){
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: "Invalid state request"
            });
        }
        let blockUser;
        if(role === RoleConstants.CUSTOMER){
            blockUser = await CustomerService.onOffBlockCustomer(email, state);
        }else if (role === RoleConstants.SHOPPER){
            blockUser = await ShopperService.onOffBlockShopper(email, state);
        } else {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: "Invalid Role in request"
            });
        }
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: `${state == 0 ? "un block" : "block"} user successfully`,
            data: {
                user: blockUser,
                role: role
            }
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

export const getListShopperWithStatus = async (req, res) => {
    try{
        let state = parseInt(req.query.state);
        console.log(state);
        if(state !== 0 && state !== 1 && state !== -1){
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: "invalid state request"
            });
        }
        let shoppers = await ShopperService.getAllWithState(state);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: `get list shopper with state ${state} successfully`,
            data: shoppers
        });
    }catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
}

export const changeRequestShopperStatus = async (req, res) => {
    try{
        let shopperId = req.query.shopperId;
        let state = parseInt(req.query.state);
        if(state !== 1 && state !== -1){
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: "invalid state request"
            });
        }

        let updateShopper = await ShopperService.changeStateShopper(shopperId, state);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: "Change shopper state successfully",
            data: updateShopper
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

export const changePassword = async (req, res) => {
    try{
        let userId = req.userId;

        let admin = await AdminService.findAdminById(userId);

        let {oldPass, newPass} = req.body;

        //check before change password
        if(oldPass === newPass){
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: "New password must be different with old password",
            });
        }

        if(compareSync(oldPass, admin.password)){
            await AdminService.updatePassword(userId, hashSync(newPass));
            return res.status(httpStatus.OK).send({
                status: apiStatus.SUCCESS,
                message: "Change password successfully"
            });
        }else {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: "Old password not match!"
            });
        }
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