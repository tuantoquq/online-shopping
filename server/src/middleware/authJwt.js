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
        message: 'Unauthorized!',
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

    verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return CatchExpiredTokenError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};
