import express from 'express'
import statisticController from '../controller/statistic.controller.js'

const statisticRoutes = express.Router()

statisticRoutes.get('/api/v1/statistic/countOrder', statisticController.countOrder)
statisticRoutes.get('/api/v1/statistic/countShop', statisticController.countShop)
statisticRoutes.get('/api/v1/statistic/countShopRegister', statisticController.countShopRegister)
statisticRoutes.get('/api/v1/statistic/countCustomer', statisticController.countUser)
statisticRoutes.get('/api/v1/statistic/countRevenue', statisticController.countRevenue)



export default statisticRoutes
