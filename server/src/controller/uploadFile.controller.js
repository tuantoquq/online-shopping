import { httpStatus, apiStatus } from '../constants/index.js';

export const uploadFile = async (req, res, next) => {
    const file = req.file;

    //check file extensions
    if (!file) {
        const error = new Error('Upload file again!');
        error.httpStatusCode = 400;
        return next(error);
    }

    //if oke => save to statics folder
    return res.status(httpStatus.OK).send({
        status: apiStatus.SUCCESS,
        message: 'upload file successfully',
        data: `http://tipi-shopping.eastasia.cloudapp.azure.com/scontent/images/${req.file.filename}`,
    });
};
