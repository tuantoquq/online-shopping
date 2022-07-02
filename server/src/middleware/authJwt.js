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
    let bearerToken = req.headers.authorization;
    if(bearerToken !== undefined && bearerToken.startsWith("Bearer ")){
        let token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(httpStatus.FORBIDDEN).send({
                status: apiStatus.AUTH_ERROR,
                message: 'No token provide!',
            });
        }

        verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return CatchExpiredTokenError(err, res);
            }
            req.userId = decoded.id;
            next();
        });
    }else {
        return res.status(httpStatus.FORBIDDEN).send({
            status: apiStatus.AUTH_ERROR,
            message: 'Invalid token provide!',
        });
    }
    
};

export const verifyRefreshToken = async (req, res, next) => {
    let bearerToken = req.headers.authorization;
    if(bearerToken !== undefined && bearerToken.startsWith("Bearer ")){
        let refreshToken = bearerToken.split(' ')[1];
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
    }else {
        return res.status(httpStatus.BAD_REQUEST).send({
            status: apiStatus.AUTH_ERROR,
            message: "Invalid token!"
        });
    }
    
};
