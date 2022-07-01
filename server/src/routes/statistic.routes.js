import express from 'express'
import statisticController from '../controller/statistic.controller.js'

const statisticRoutes = express.Router()

statisticRoutes.get('/api/v1/statistic/countOrder', statisticController.countOrder)

export default statisticRoutes
