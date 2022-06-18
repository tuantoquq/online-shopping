import { apiStatus } from '../constants/apiStatus.js';
import { httpStatus } from '../constants/httpStatus.js';
import CustomError from '../error/customError.js';
import Comment from '../model/comment.js';

const CommentService = {};

CommentService.findById = async (commentId) => {
    let comment = await Comment.findById(commentId);
    if (!comment) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `Comment not found with id ${commentId}`,
        );
    }
    return comment;
};

CommentService.findAllCommentForProduct = async (productId) => {
    let listComments = await Comment.find({ productId: productId });
    return listComments;
};

CommentService.addComment = async (comment) => {
    await comment.save((err, comment) => {
        if (err)
            throw new CustomError(
                httpStatus.INTERNAL_SERVER_ERROR,
                apiStatus.DATABASE_ERROR,
                `Error when save comment: ${err.message}`,
            );
        else return comment;
    });
};

CommentService.findCommentByCustomerAndProduct = async (customerId, productId) => {
    let comment = await Comment.findOne({ customerId: customerId, productId: productId });
    return comment;
};

export default CommentService;
