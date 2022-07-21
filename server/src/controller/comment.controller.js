import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/customError.js';
import CommentService from '../service/comment.service.js';
import ProductService from '../service/product.service.js';
import { Comment } from '../model/index.js';
import fs from 'fs';

export const addComment = async (req, res, next) => {
    try {
        
        let userId = req.userId;
        let productId = req.body.productId;

        //check exist comment
        let checkComment = await CommentService.findCommentByCustomerAndProduct(
            userId,
            productId,
        );

        if (!checkComment) {
            const content = req.body.content;

            const checkIsBadComment = await checkBadWordInComment(content);
            console.log("check in controller: ", checkIsBadComment);
            if(checkIsBadComment){
                return res.status(httpStatus.BAD_REQUEST).send({
                    status: apiStatus.INVALID_PARAM,
                    message: "Your comment has contain bad word! Retry with clean comment!"
                });
            }

            //upload images
            let imageFiles = req.files;
            if(!imageFiles.mimetype.startsWith("image/")){
                return res.status(httpStatus.BAD_REQUEST).send({
                    status: apiStatus.INVALID_PARAM,
                    message: "Only support image file!"
                });
            }
            //check file extensions
            if (!imageFiles) {
                const error = new Error('Upload file again!');
                error.httpStatusCode = 400;
                return next(error);
            }


            let imageUrls = [];
            for (let i = 0; i < imageFiles.length; i++) {
                imageUrls.push(`${process.env.IMAGE_PRE_PATH}/${imageFiles[i].filename}`);
            }
            //not exist => can comment
            let newComment = new Comment({
                customerId: userId,
                productId: productId,
                content: req.body.content,
                ratingStar: parseInt(req.body.ratingStar),
                images: imageUrls,
            });
            let rsComment = await CommentService.addComment(newComment);
            return res.status(httpStatus.OK).send({
                status: apiStatus.SUCCESS,
                message: 'add comment successfully',
                data: rsComment
            });
        }
        return res.status(httpStatus.BAD_REQUEST).send({
            status: apiStatus.INVALID_PARAM,
            message: 'Already exist comment for customer with this product',
        });
    } catch (err) {
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
};

export const getAllCommentOfProduct = async (req, res) => {
    try {
        let productId = req.query.productId;

        //check exist product
        await ProductService.findProductById(productId);

        //if exist
        let listComment = await CommentService.findAllCommentForProduct(productId);
        for (let i = 0; i < listComment.length ; i++){
            listComment[i] = listComment[i].toObject();
            let customer = listComment[i].customerId;
            delete listComment[i]['customerId']
            listComment[i].customer = customer;
        }
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'get all comment of product successfully',
            data: listComment,
        });
    } catch (err) {
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
};

const checkBadWordInComment = async (comment) => {
    const filename = 'src/utils/badWord.txt';
    let dataBadWord = await fs.promises.readFile(filename, 'utf-8');

    const listBadWord = dataBadWord.split(' ');
    const listWordInComment = comment.split(' ');

    for(const ele of listWordInComment){
        if(listBadWord.includes(ele)){
            return true;
        }
    }
    return false;
}