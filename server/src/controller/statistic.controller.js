import { Product, Order, OrderProduct, Shop, Customer } from "../model/index.js";
import { httpStatus, apiStatus } from '../constants/index.js';

const statisticController = {}

statisticController.countOrder = async (req, res) => {
    try {
        const {startDate, endDate } = req.body 
        let query = [
            {
                $match: { "createdAt": { $gte: new Date(startDate), $lte: new Date(endDate) } }
            },
            {   
                $group: {
                        "_id": { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        "count": {
                            $sum: 1
                        } 
                    }
            },
            {
                $sort: { "_id" : 1 }
            }
        ]
        const result = await Order.aggregate(query)
        return res.status(httpStatus.OK).json({
            data: result,
            status: apiStatus.SUCCESS
        })


    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
}

statisticController.countUser = async (req, res) => {
    try {
        const {startDate, endDate } = req.body 
        let query = [
            {
                $match: { "createdAt": { $gte: new Date(startDate), $lte: new Date(endDate) } }
            },
            {   
                $group: {
                        "_id": { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        "count": {
                            $sum: 1
                        } 
                    }
            },
            {
                $sort: { "_id" : 1 }
            }
        ]
        const result = await Customer.aggregate(query)
        return res.status(httpStatus.OK).json({
            data: result,
            status: apiStatus.SUCCESS
        })


    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
}

statisticController.countShop = async (req, res) => {
    try {
        const {startDate, endDate } = req.body 
        let query = [
            {
                $match: { "createAt": { $gte: new Date(startDate), $lte: new Date(endDate) } }
            },
            {
                $match: { "status": 1 }
            },
            {   
                $group: {
                        "_id": { $dateToString: { format: "%Y-%m-%d", date: "$createAt" } },
                        "count": {
                            $sum: 1
                        } 
                    }
            },
            {
                $sort: { "_id" : 1 }
            }
        ]
        console.log(query)
        const result = await Shop.aggregate(query)
        return res.status(httpStatus.OK).json({
            data: result,
            status: apiStatus.SUCCESS
        })


    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
}

statisticController.countShopRegister = async (req, res) => {
    try {
        const {startDate, endDate } = req.body 
        let query = [
            {
                $match: { "createAt": { $gte: new Date(startDate), $lte: new Date(endDate) } }
            },
            {
                $match: { "status": 0 }
            },
            {   
                $group: {
                        "_id": { $dateToString: { format: "%Y-%m-%d", date: "$createAt" } },
                        "count": {
                            $sum: 1
                        } 
                    }
            },
            {
                $sort: { "_id" : 1 }
            }
        ]
        const result = await Shop.aggregate(query)
        return res.status(httpStatus.OK).json({
            data: result,
            status: apiStatus.SUCCESS
        })


    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
}


export default statisticController;


// db.orders.aggregate([
//     {
//         $match: { "createdAt": { $gte: new Date("2022-06-20"), $lte: new Date("2022-06-30") } }
//     },
//     {   
//         $group: {
//                 "_id": {
//                     "year" : {
//                         $year : "$createdAt"
//                     },
//                     "month" : {
//                         $month : "$createdAt"
//                     }, 
//                     "day": {
//                         $dayOfMonth: "$createdAt"
//                     }
//                 },
//                 "count": {
//                     $sum: 1
//                 } 
//             }
//     }
// ])


// db.orders.aggregate([
//     {
//         $match: { "createdAt": { $gte: new Date("2022-06-20"), $lte: new Date("2022-06-30") } }
//     },
//     {   
//         $group: {
//                 "_id": { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//                 "count": {
//                     $sum: 1
//                 } 
//             }
//     },
//     {
//         $sort: { "_id" : 1 }
//     }
// ])