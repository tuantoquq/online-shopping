import { Customer } from '../model/index.js';
import { httpStatus, apiStatus } from '../constants/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const { hashSync, compareSync } = bcrypt;
const { sign } = jwt;
const refreshTokens = {};

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
            return res.status(httpStatus.NOT_FOUND).send({
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
        refreshTokens[refreshToken] = cusInfo;

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
