import { httpStatus, apiStatus } from '../constants/index.js';

export const uploadFile = async (req, res, next) => {
    const file = req.file;

    if(!file.mimetype.startsWith("image/")){
        return res.status(httpStatus.BAD_REQUEST).send({
            status: apiStatus.INVALID_PARAM,
            message: "Only support image file!"
        });
    }

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
        data: `${process.env.IMAGE_PRE_PATH}/${req.file.filename}`,
    });
};
