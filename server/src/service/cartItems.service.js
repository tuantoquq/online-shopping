import { apiStatus, httpStatus } from '../constants/index.js';
import CustomError from '../error/customError.js';
import CartItems from '../model/cartItems.js';

const CartItemsService = {};

CartItemsService.addCartItems = async (cartItems) => {
    await cartItems.save((err, cartItems) => {
        if (err)
            throw new CustomError(
                httpStatus.INTERNAL_SERVER_ERROR,
                apiStatus.DATABASE_ERROR,
                `Error when save cartItems: ${err.message}`,
            );
        else return cartItems;
    });
};

CartItemsService.getAllCartItemsByCustomerId = async (customerId) => {
    let listCartItems = await CartItems.find({ customerId: customerId });
    return listCartItems;
};

CartItemsService.deleteCartItemsById = async (cartItemsId) => {
    let cartItems = await CartItems.findById(cartItemsId);
    if (!cartItems) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `Cart items not found with id ${cartItemsId}`,
        );
    }

    //if exist => delete
    await CartItems.deleteOne({ _id: cartItemsId });
    return cartItems;
};

export default CartItemsService;
