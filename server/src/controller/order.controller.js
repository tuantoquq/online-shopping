import { apiStatus, httpStatus } from '../constants/index.js';
import CustomError from '../error/customError.js';
import OrderProductService from '../service/orderProduct.service.js';
import OrderService from '../service/order.service.js';
import DeliveryAddressService from '../service/deliveryAddress.service.js';
import Order from '../model/order.js';
import CartItemsService from '../service/cartItems.service.js';
import OrderProduct from '../model/orderProduct.js';
import ProductService from '../service/product.service.js';
import mongoose from 'mongoose';

export const addOrder = async (req, res) => {
    try {
        let addressId = req.body.addressId;
        let userId = req.userId;

        //find exist addressId
        let address = await DeliveryAddressService.findDeliveryAddressById(addressId);

        //get list cart items to order
        let listCartItems = req.body.listCartItems;
        if(listCartItems.length === 0){
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: "No items to order!"
            });
        }
        let carts = [];
        let products = [];
        let setShop = new Set();
        //check cart items is exist
        for (let i = 0; i < listCartItems.length; i++){
            let cartItems = await CartItemsService.findCartItemsById(
                listCartItems[i],
                userId,
            );

            //get current product
            let product = await ProductService.findProductById(cartItems.productId);
            setShop.add(product.shopId.toString());
            carts.push(cartItems);
            products.push(product);
        }

        if(setShop.size > 1){
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: "You can only buy products in one shop for each order"
            });
        }

        let [shopId] = setShop;

        //create order
        let newOrder = new Order({
            customerId: userId,
            orderStatus: 0,
            receiverName: address.receiverName,
            phone: address.phone,
            deliveryAddress: `${address.details}, ${address.ward}, ${address.district}, ${address.city}`,
            shopId: new mongoose.Types.ObjectId(shopId)
        });

        const order = await OrderService.addOrder(newOrder);

        //create order products
        let listOrderProduct = [];

        for (let i = 0; i < listCartItems.length; i++) {

            //create new order product
            let newOrderProduct = new OrderProduct({
                orderId: order._id,
                productId: products[i]._id,
                productName: products[i].productName,
                size: carts[i].size,
                count: carts[i].count,
                currentPrice: products[i].price,
                productImageUrl: products[i].imageUrls[0].base_url,
            });

            let orderProduct = await OrderProductService.addOrderProduct(newOrderProduct);
            listOrderProduct.push(orderProduct);
        }

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
            listOrder = await OrderService.getListOrderByCustomer(customerId);
        }
        for (let i = 0; i< listOrder.length; i++){
            listOrder[i] = listOrder[i].toObject();
            let listOrderProduct = await OrderProductService.getListOrderProductOfOrder(listOrder[i]._id);
            console.log(`index: ${i}: orderId: ${listOrder[i]._id}` ,listOrderProduct.length);
            listOrder[i].orderProduct = listOrderProduct;
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

export const updateOrderStatus = async (req, res) => {
    try {
        let { status, orderId, reasonReject} = req.body;
        if (status === 1 || status === -1 || status === 2) {
            let order;
            if(status === -1){
                if(reasonReject === undefined || reasonReject === ""){
                    return res.status(httpStatus.BAD_REQUEST).send({
                        status: apiStatus.INVALID_PARAM,
                        message: 'Reason to reject is required',
                    });
                }
                order = await OrderService.rejectOrder(orderId, reasonReject);
            }else {
                order = await OrderService.updateOrder(orderId, status);
            }
            
            return res.status(httpStatus.OK).send({
                status: apiStatus.SUCCESS,
                message: 'update order status successfully',
                data: order,
            });
        }
        return res.status(httpStatus.BAD_REQUEST).send({
            status: apiStatus.INVALID_PARAM,
            message: 'Request status not valid',
        });
    } catch (err) {
        console.log(err)
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
