import CustomError from '../error/customError.js';
import CartItemsService from '../service/cartItems.service.js';
import ProductService from '../service/product.service.js';
import CartItems from '../model/cartItems.js';
import { httpStatus } from '../constants/httpStatus.js';
import { apiStatus } from '../constants/apiStatus.js';

export const addCartItems = async (req, res) => {
    try {
        let customerId = req.userId;
        let addCartItemsRequest = req.body;
        //check exist product by id
        let product = await ProductService.findProductById(addCartItemsRequest.productId);

        //create cartItems
        let cartItems = new CartItems({
            customerId: customerId,
            productId: product.id,
            size: addCartItemsRequest.size,
            count: addCartItemsRequest.quantity,
        });
        const saveCartItems = CartItemsService.addCartItems(cartItems);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'Add cart items successfully',
            data: saveCartItems,
        });
    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.httpStatus).send({
                status: err.apiStatus,
                message: err.message,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.DATABASE_ERROR,
            message: 'Error when save customer: ' + err,
        });
    }
};

export const updateCartItems = async (req, res) => {
    try {
        let cartItemsId = req.body.cartItemsId;
        let userId = req.userId;
        let quantity = req.body.quantity;

        //check exist cart items
        let cartItems = await CartItemsService.findCartItemsById(cartItemsId, userId);

        //update quantity of cartItems
        cartItems.count = quantity;
        let updateCartItems = await CartItemsService.updateCartItems(cartItems);

        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'update cartItems successfully',
            data: updateCartItems,
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

export const deleteCartItems = async (req, res) => {
    try {
        let cartItemsId = req.params.cartItemsId;
        let userId = req.userId;

        //check exist cart
        let cartItems = await CartItemsService.findCartItemsById(cartItemsId, userId);

        //delete cartItems
        const deleteCartItems = await CartItemsService.deleteCartItemsById(cartItems._id);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'delete cartItems successfully',
            data: deleteCartItems,
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

export const getAllCartItemsByCustomerId = async (req, res) => {
    try {
        const customerId = req.userId;
        let listCartItems = await CartItemsService.getAllCartItemsByCustomerId(
            customerId,
        );
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'get list cart items by customer successfully!',
            data: listCartItems,
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};
