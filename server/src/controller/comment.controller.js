import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/customError.js';
import CommentService from '../service/comment.service.js';
import ProductService from '../service/product.service.js';
import { Comment } from '../model/index.js';

export const addComment = async (req, res) => {
    try {
        let userId = req.userId;
        let productId = req.body.productId;

        //check exist comment
        let checkComment = await CommentService.findCommentByCustomerAndProduct(
            userId,
            productId,
        );

        if (!checkComment) {
            //not exist => can comment
            let newComment = new Comment({
                customerId: userId,
                productId: productId,
                content: req.body.content,
                ratingStar: req.body.ratingStar,
                images: req.body.images,
            });
            let rsComment = await CommentService.addComment(newComment);
            return res.status(httpStatus.OK).send({
                status: apiStatus.SUCCESS,
                message: 'add comment successfully',
                data: rsComment,
            });
        }
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