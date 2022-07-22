import express from 'express';
import {
    getAllShop,
    getListProductOfShop,
    getShopInfo,
    deleteShop
} from '../controller/shop.controller.js';

const shopRoutes = express.Router();

shopRoutes.get('/api/v1/shops', getAllShop);
shopRoutes.get('/api/v1/shops/profile', getShopInfo);
shopRoutes.get('/api/v1/shops/list-products', getListProductOfShop);
shopRoutes.delete('api/v1/shops/delete', deleteShop)
export default shopRoutes;
