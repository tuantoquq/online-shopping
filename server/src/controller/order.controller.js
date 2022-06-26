import { apiStatus, httpStatus } from '../constants/index.js';
import CustomError from '../error/customError.js';
import OrderProductService from '../service/orderProduct.service.js';
import OrderService from '../service/order.service.js';
import DeliveryAddressService from '../service/deliveryAddress.service.js';
import Order from '../model/order.js';
import CartItemsService from '../service/cartItems.service.js';
import OrderProduct from '../model/orderProduct.js';
import ProductService from '../service/product.service.js';

export const addOrder = async (req, res) => {
    try {
        let addressId = req.body.addressId;
        let userId = req.userId;

        //find exist addressId
        let address = await DeliveryAddressService.findDeliveryAddressById(addressId);

        //get list cart items to order
        let listCartItems = req.body.listCartItems;

        //create order
        let newOrder = new Order({
            customerId: userId,
            orderStatus: 0,
            receiverName: address.receiverName,
            phone: address.phone,
            deliveryAddress: `${address.details}, ${address.ward}, ${address.district}, ${address.city}`,
        });

        const order = await OrderService.addOrder(newOrder);

        //create order products
        let listOrderProduct = [];
        for (let i = 0; i < listCartItems.length; i++) {
            //get cartItems from id
            let cartItems = await CartItemsService.findCartItemsById(
                listCartItems[i],
                userId,
            );

            //get current product
            let product = await ProductService.findProductById(cartItems.productId);

            //create new order product
            let newOrderProduct = new OrderProduct({
                orderId: order._id,
                productId: product._id,
                productName: product.productName,
                size: cartItems.size,
                count: cartItems.count,
                currentPrice: product.price,
                productImageUrl: product.imageUrls[0].base_url,
            });

            let orderProduct = await OrderProductService.addOrderProduct(newOrderProduct);
            listOrderProduct.push(orderProduct);
        }
        console.log(listOrderProduct);

        //delete cart items from carts
        listCartItems.map(async (cartItemsId) => {
            await CartItemsService.deleteCartItemsById(cartItemsId);
        });

        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'order successfully',
            data: {
                order: order,
                orderProducts: listOrderProduct,
            },
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

export const getListOrderByCustomerWithOptionStatus = async (req, res) => {
    try {
        let status = req.query.status;
        let customerId = req.userId;
        let listOrder;
        if (status != null && status != undefined && status != '') {
            listOrder = await OrderService.getListOrderByCustomerAndStatus(
                customerId,
                status,
            );
        } else {
            console.log('aaaa');
            listOrder = await OrderService.getListOrderByCustomer(customerId);
        }

        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'get list order successfully',
            data: listOrder,
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};
