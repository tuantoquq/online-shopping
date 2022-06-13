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
