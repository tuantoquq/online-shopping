import { Customer, Shopper, Admin } from '../model/index.js';
import { httpStatus, apiStatus } from '../constants/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import CustomerService from '../service/customer.service.js';
import CustomError from '../error/customError.js';
import ShopperService from '../service/shopper.service.js';
import AdminService from '../service/admin.service.js';

const { hashSync, compareSync } = bcrypt;
const { sign } = jwt;
const refreshTokensCustomer = {};
const refreshTokensShopper = {};
const refreshTokensAdmin = {};

//Customer
export const registerCustomer = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: 'Invalid params',
                error: errors.array(),
            });
        }
        //check email is used?
        await CustomerService.findCustomerByEmail(req.body.email);

        return res.status(httpStatus.BAD_REQUEST).send({
            status: apiStatus.INVALID_PARAM,
            message: 'Email is already used! Try another',
        });
    } catch (err) {
        if (err instanceof CustomError) {
            //create new customer
            const newCustomer = new Customer({
                email: req.body.email,
                password: hashSync(req.body.password),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                dateOfBirth: req.body.dateOfBirth,
                gender: req.body.gender,
            });
            let customer = await CustomerService.addCustomer(newCustomer);
            return res.status(httpStatus.OK).send({
                status: apiStatus.SUCCESS,
                message: 'User was registered successfully',
                data: customer,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.DATABASE_ERROR,
            message: 'Error when save customer: ' + err,
        });
    }
};

export const updateInforCustomer = async (req, res) => {
    try {
        let shopId = req.query.shopId;
        var dataUpdate = {};
        let listPros = [
            'email',
            'password',
            'phone',
            'firstName',
            'lastName',
            'dateOfBirth',
            'gender',
        ];

        for (let i = 0; i < listPros.length; i++) {
            let property = listPros[i];
            if (property != 'password' && req.body.hasOwnProperty(property)) {
                dataUpdate[property] = req.body[property];
            } else if (property == 'password' && req.body.hasOwnProperty('password')) {
                var customerCheck = await Customer.findById(shopId);
                var passwordIsValid = compareSync(
                    req.body['password'],
                    customerCheck.password,
                );
                if (!passwordIsValid) {
                    return res.status(httpStatus.OK).json({
                        message: "Password isn't match",
                    });
                }
            }
        }
        dataUpdate['updateAt'] = Date.now();
        let customer = await Customer.findOneAndUpdate({ _id: shopId }, dataUpdate);
        if (!customer) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Can't find shopper",
            });
        }
        return res.status(httpStatus.OK).json({
            data: customer,
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message,
        });
    }
};

export const loginCustomer = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: 'Invalid params',
                error: errors.array(),
            });
        }

        //get customer by email
        let customer = await CustomerService.findCustomerByEmail(req.body.email);
        const passwordIsValid = compareSync(req.body.password, customer.password);
        if (!passwordIsValid) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                status: apiStatus.AUTH_ERROR,
                message: 'Incorrect password!',
            });
        }

        //sign token
        const cusInfo = {
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
        };

        let token = sign(cusInfo, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        });
        let refreshToken = sign(cusInfo, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
        });
        refreshTokensCustomer[refreshToken] = cusInfo;

        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'Login successfully',
            data: {
                token: token,
                tokenExpire: parseInt(process.env.ACCESS_TOKEN_EXPIRATION),
                refreshToken: refreshToken,
                refreshTokenExpire: parseInt(process.env.REFRESH_TOKEN_EXPIRATION),
            },
        });
    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.httpStatus).send({
                status: err.apiStatus,
                message: 'Email is not existed. Try again...',
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

export const refreshTokenForCustomer = async (req, res) => {
    let refreshToken = req.headers.authorization.split(' ')[1];
    if (refreshToken && refreshToken in refreshTokensCustomer) {
        const cusInfo = refreshTokensCustomer[refreshToken];

        var token = sign(cusInfo, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        });

        refreshToken = sign(cusInfo, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
        });

        refreshTokensCustomer[refreshToken] = cusInfo;

        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'refresh token successfully',
            data: {
                token,
                tokenExpire: parseInt(process.env.ACCESS_TOKEN_EXPIRATION),
                refreshToken: refreshToken,
                refreshTokenExpire: parseInt(process.env.REFRESH_TOKEN_EXPIRATION),
            },
        });
    } else {
        return res.status(httpStatus.UNAUTHORIZED).send({
            status: apiStatus.AUTH_ERROR,
            message: 'refresh token is required in body',
        });
    }
};

//Shopper
export const registerShopper = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: 'Invalid params',
                error: errors.array(),
            });
        }
        //check email is used?
        await ShopperService.findShopperByEmail(req.body.email);
        return res.status(httpStatus.BAD_REQUEST).send({
            status: apiStatus.INVALID_PARAM,
            message: 'Email is already used! Try another',
        });
    } catch (err) {
        if (err instanceof CustomError) {
            //create new shopper
            const newShopper = new Shopper({
                email: req.body.email,
                password: hashSync(req.body.password),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                dateOfBirth: req.body.dateOfBirth,
                gender: req.body.gender,
                cccd: req.body.cccd,
                issueDate: req.body.issueDate,
                issuePlace: req.body.issuePlace,
                state: 0,
            });
            let shopper = await ShopperService.addShopper(newShopper);
            return res.status(httpStatus.OK).send({
                status: apiStatus.SUCCESS,
                message: 'Registered successfully! Waiting for accept request!',
                data: shopper,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.DATABASE_ERROR,
            message: 'Error when save shopper: ' + err,
        });
    }
};

export const loginShopper = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: 'Invalid params',
                error: errors.array(),
            });
        }

        //get shopper by email
        let shopper = await ShopperService.findShopperByEmail(req.body.email);
        const passwordIsValid = compareSync(req.body.password, shopper.password);
        if (!passwordIsValid) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                status: apiStatus.AUTH_ERROR,
                message: 'Incorrect password!',
            });
        }

        //sign token
        const shopperInfo = {
            id: shopper.id,
            firstName: shopper.firstName,
            lastName: shopper.lastName,
            phoneNumber: shopper.phoneNumber,
            email: shopper.email,
        };

        let token = sign(shopperInfo, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        });
        let refreshToken = sign(shopperInfo, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
        });
        refreshTokensShopper[refreshToken] = shopperInfo;

        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'Login successfully',
            data: {
                token: token,
                tokenExpire: parseInt(process.env.ACCESS_TOKEN_EXPIRATION),
                refreshToken: refreshToken,
                refreshTokenExpire: parseInt(process.env.REFRESH_TOKEN_EXPIRATION),
            },
        });
    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.httpStatus).send({
                status: err.apiStatus,
                message: 'Email is not existed. Try again...',
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

export const updateInforShopper = async (req, res) => {
    try {
        let shopId = req.query.shopId;
        var dataUpdate = {};
        let listPros = [
            'email',
            'password',
            'firstName',
            'lastName',
            'phoneNumber',
            'gender',
            'cccd',
            'issueDate',
            'issuePlace',
        ];

        for (let i = 0; i < listPros.length; i++) {
            let property = listPros[i];
            if (property != 'password' && req.body.hasOwnProperty(property)) {
                dataUpdate[property] = req.body[property];
            } else if (property == 'password' && req.body.hasOwnProperty('password')) {
                var shopper = await Shopper.findById(shopId);
                var passwordIsValid = compareSync(req.body['password'], shopper.password);
                if (!passwordIsValid) {
                    return res.status(httpStatus.OK).json({
                        message: "Password isn't match",
                    });
                }
            }
        }

        let shop = await Shopper.findOneAndUpdate({ _id: shopId }, dataUpdate);
        if (!shop) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Can't find shopper",
            });
        }
        return res.status(httpStatus.OK).json({
            data: shop,
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message,
        });
    }
};

export const refreshTokenForShopper = async (req, res) => {
    let refreshToken = req.headers.authorization.split(' ')[1];
    if (refreshToken && refreshToken in refreshTokensShopper) {
        const shopperInfo = refreshTokensShopper[refreshToken];

        var token = sign(shopperInfo, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        });

        refreshToken = sign(shopperInfo, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
        });

        refreshTokenForShopper[refreshToken] = shopperInfo;

        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'refresh token successfully',
            data: {
                token,
                tokenExpire: parseInt(process.env.ACCESS_TOKEN_EXPIRATION),
                refreshToken: refreshToken,
                refreshTokenExpire: parseInt(process.env.REFRESH_TOKEN_EXPIRATION),
            },
        });
    } else {
        return res.status(httpStatus.UNAUTHORIZED).send({
            status: apiStatus.AUTH_ERROR,
            message: 'refresh token is required in body',
        });
    }
};

//admin
export const registerAdmin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: 'Invalid params',
                error: errors.array(),
            });
        }
        //check username is used?
        await AdminService.findAdminByUsername(req.body.username);
        return res.status(httpStatus.BAD_REQUEST).send({
            status: apiStatus.INVALID_PARAM,
            message: 'Username is already used! Try another',
        });
    } catch (err) {
        if (err instanceof CustomError) {
            //create new admin
            const newAdmin = new Admin({
                username: req.body.username,
                password: hashSync(req.body.password),
            });
            let admin = await AdminService.addAdmin(newAdmin);
            return res.status(httpStatus.OK).send({
                status: apiStatus.SUCCESS,
                message: 'Registered successfully!',
                data: admin,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.DATABASE_ERROR,
            message: 'Error when save admin: ' + err,
        });
    }
};
export const loginAdmin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: 'Invalid params',
                error: errors.array(),
            });
        }

        //get admin by username
        let admin = await AdminService.findAdminByUsername(req.body.username);
        const passwordIsValid = compareSync(req.body.password, admin.password);
        if (!passwordIsValid) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                status: apiStatus.AUTH_ERROR,
                message: 'Incorrect password!',
            });
        }

        //sign token
        const adminInfo = {
            id: admin.id,
            username: admin.username,
        };

        let token = sign(adminInfo, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        });
        let refreshToken = sign(adminInfo, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
        });
        refreshTokensAdmin[refreshToken] = adminInfo;

        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'Login successfully',
            data: {
                token: token,
                tokenExpire: parseInt(process.env.ACCESS_TOKEN_EXPIRATION),
                refreshToken: refreshToken,
                refreshTokenExpire: parseInt(process.env.REFRESH_TOKEN_EXPIRATION),
            },
        });
    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                status: apiStatus.INVALID_PARAM,
                message: 'Username is not existed! Try again..',
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

export const refreshTokenForAdmin = async (req, res) => {
    let refreshToken = req.headers.authorization.split(' ')[1];
    if (refreshToken && refreshToken in refreshTokensAdmin) {
        const adminInfo = refreshTokensAdmin[refreshToken];

        var token = sign(adminInfo, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        });

        refreshToken = sign(adminInfo, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
        });

        refreshTokensCustomer[refreshToken] = adminInfo;

        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'refresh token successfully',
            data: {
                token,
                tokenExpire: parseInt(process.env.ACCESS_TOKEN_EXPIRATION),
                refreshToken: refreshToken,
                refreshTokenExpire: parseInt(process.env.REFRESH_TOKEN_EXPIRATION),
            },
        });
    } else {
        return res.status(httpStatus.UNAUTHORIZED).send({
            status: apiStatus.AUTH_ERROR,
            message: 'refresh token is required in body',
        });
    }
};
