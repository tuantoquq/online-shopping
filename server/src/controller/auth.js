import { Customer, Shopper, Admin } from '../model/index.js';
import { httpStatus, apiStatus } from '../constants/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const { hashSync, compareSync } = bcrypt;
const { sign } = jwt;
const refreshTokensCustomer = {};
const refreshTokensShopper = {};
const refreshTokensAdmin = {};

//Customer
export const registerCustomer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(httpStatus.BAD_REQUEST).send({
            status: apiStatus.INVALID_PARAM,
            message: 'Invalid params',
            error: errors.array(),
        });
    }
    //check email is used?
    await Customer.findOne({ email: req.body.email }).then((checkCustomer) => {
        if (checkCustomer) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: 'Email is already used! Try another',
            });
        }
    });

    //create new customer
    const newCustomer = new Customer({
        email: req.body.email,
        password: hashSync(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
    });

    newCustomer.save((err, newCustomer) => {
        if (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                status: apiStatus.DATABASE_ERROR,
                message: 'Error when save customer: ' + err,
            });
        }
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'User was registered successfully',
            data: newCustomer,
        });
    });
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

        let customer = await Customer.findOne({ email: req.body.email });
        if (!customer) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                status: apiStatus.INVALID_PARAM,
                message: 'Email is not existed! Try again..',
            });
        }
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(httpStatus.BAD_REQUEST).send({
            status: apiStatus.INVALID_PARAM,
            message: 'Invalid params',
            error: errors.array(),
        });
    }
    //check email is used?
    await Shopper.findOne({ email: req.body.email }).then((checkShopper) => {
        if (checkShopper) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: 'Email is already used! Try another',
            });
        }
    });

    //create new shopper
    const newShopper = new Shopper({
        email: req.body.email,
        password: hashSync(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        cccd: req.body.cccd,
        issueDate: req.body.issueDate,
        issuePlace: req.body.issuePlace,
        state: 0,
    });

    newShopper.save((err, newShopper) => {
        if (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                status: apiStatus.DATABASE_ERROR,
                message: 'Error when save shopper: ' + err,
            });
        }
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'Registered successfully! Waiting for accept request!',
            data: newShopper,
        });
    });
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

        let shopper = await Shopper.findOne({ email: req.body.email });
        if (!shopper) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                status: apiStatus.INVALID_PARAM,
                message: 'Email is not existed! Try again..',
            });
        }
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
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(httpStatus.BAD_REQUEST).send({
            status: apiStatus.INVALID_PARAM,
            message: 'Invalid params',
            error: errors.array(),
        });
    }
    //check username is used?
    await Admin.findOne({ username: req.body.username }).then((checkAdmin) => {
        if (checkAdmin) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: 'Username is already used! Try another',
            });
        }
    });

    //create new admin
    const newAdmin = new Admin({
        username: req.body.username,
        password: hashSync(req.body.password),
    });

    newAdmin.save((err, newAdmin) => {
        if (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                status: apiStatus.DATABASE_ERROR,
                message: 'Error when save admin: ' + err,
            });
        }
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'Registered successfully!',
            data: newAdmin,
        });
    });
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

        let admin = await Admin.findOne({ username: req.body.username });
        if (!admin) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                status: apiStatus.INVALID_PARAM,
                message: 'Username is not existed! Try again..',
            });
        }
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
