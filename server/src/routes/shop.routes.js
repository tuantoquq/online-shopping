import express from 'express';
import {
    getAllShop,
    getListProductOfShop,
    getShopInfo,
} from '../controller/shop.controller.js';

const shopRoutes = express.Router();

shopRoutes.get('/api/v1/shops', getAllShop);
shopRoutes.get('/api/v1/shops/profile', getShopInfo);
shopRoutes.get('/api/v1/shops/list-products', getListProductOfShop);
export default shopRoutes;
