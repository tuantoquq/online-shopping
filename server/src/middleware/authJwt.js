import jwt from 'jsonwebtoken';
import { httpStatus, apiStatus } from '../constants/index.js';

const { verify, TokenExpiredError } = jwt;

const CatchExpiredTokenError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(httpStatus.UNAUTHORIZED).send({
            status: apiStatus.AUTH_ERROR,
            message: 'Unauthorized! Token was expired',
        });
    }
    return res.status(httpStatus.UNAUTHORIZED).send({
        status: apiStatus.AUTH_ERROR,
        message: 'Unauthorized! Invalid token',
    });
};

export const verifyToken = async (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(httpStatus.FORBIDDEN).send({
            status: apiStatus.AUTH_ERROR,
            message: 'No token provided!',
        });
    }

    verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return CatchExpiredTokenError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};

export const verifyRefreshToken = async (req, res, next) => {
    let refreshToken = req.headers.authorization.split(' ')[1];
    if (!refreshToken) {
        return res.status(httpStatus.FORBIDDEN).send({
            status: apiStatus.AUTH_ERROR,
            message: 'No refresh token provided!',
        });
    }

    verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return CatchExpiredTokenError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};
