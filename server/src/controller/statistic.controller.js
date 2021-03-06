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

statisticController.countCancelOrder = async (req, res) => {
    try {
        const {startDate, endDate } = req.body
        let query = [
            {
                $match: { "createdAt": { $gte: new Date(startDate), $lte: new Date(endDate) } }
            },
            {
                $match: { "orderStatus" : -1 }
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

statisticController.countTopEachCategory = async (req, res) => {
    try {
        let query = [
            {
                "$lookup": {
                    "from": "order_products",
                    "localField": "_id",
                    "foreignField": "productId",
                    "as": "order_products"
                }
            },
            {
                "$unwind": "$order_products"
            },
            {
                "$lookup": {
                    "from": "categories",
                    "localField": "categoryId",
                    "foreignField": "_id",
                    "as": "categories"
                }
            },
            {
                "$unwind": "$categories"
            },
            {
                "$group": {
                    "_id": {
                        "productId": '$_id',
                        "categoryId": "$categoryId"
                    },
                    "countProduct": {
                        "$sum": "$order_products.count"
                    },
                    "infor": {
                        "$push": {"productName": "$productName", "categoryName": "$categories.categoryName", "id": "$_id"}
                    }
                }
            },
            {
                "$unwind": "$infor"
            },
            {
                "$sort": {"countProduct": -1}
            }
        ]
        const result = await Product.aggregate(query)
        console.log(result)
        let data = {}
        for(let i=0; i<result.length; i++){
            if(!data.hasOwnProperty(result[i]['infor']['categoryName'] || result[i]['countProduct'] > data[result[i]['infor']['categoryName']])){
                data[result[i]['infor']['categoryName']] = {
                    "productName": result[i]['infor']['productName'],
                    'count': result[i]['countProduct'],
                    "productId": result[i]['infor']['id']
                }
            }
        }
        console.log(data)
        return res.status(httpStatus.OK).json({
            data: data,
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


statisticController.countRevenue = async (req, res) => {
    try{
        const { startDate, endDate } = req.body
        let query = [
            {
                $lookup: {
                    from: "orders",
                    localField: "orderId",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $match: {
                                createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
                            },

                        },
                        {
                            $sort: {
                                createdAt: 1
                            }
                        }
                    ],
                    as: "temp"
                }
            }
        ]
        let history = await OrderProduct.aggregate(query)
        if(!history){
            return res.status(httpStatus.OK).json({
                message: "History is empty",
                data: []
            })
        }
        let historyRevenue = {}
        for(let i = 0; i < history.length; i++){
            if(history[i]['temp'].length > 0){
                var date = new Date(history[i]['temp'][0]['createdAt'])
                let currentDate = date.toISOString().split('T')[0]
                if(currentDate in historyRevenue){
                    historyRevenue[currentDate] += history[i]['count'] * history[i]['currentPrice']
                }
                else{
                    historyRevenue[currentDate] = 0
                }

            }
        }
        return res.status(httpStatus.OK).json({
            message: "Success",
            data: historyRevenue
        })
    }
    catch (e) {
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
//         $match: { "createdAt": { $gte: new Date("2022-06-20"), $lte: new Date("2022-09-30") } }
//     },
//     {
//         $match: {"orderStatus": -1}
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


// db.order_products.aggregate([
//     {
//         $lookup: {
//             "from": "orders",
//             "localField": "orderId",
//             "foreignField": "_id",
//             "pipeline": [
//                 {
//                     $match: {
//                         createdAt: { $gte: new Date("2022-05-03"), $lte: new Date("2022-07-22") }
//                     }
//                 },
//                 {
//                     $sort: {
//                         createdAt: 1
//                     }
//                 }
//             ],
//             "as": "temp"
//         }
//     }
// ])

// db.order_products.aggregate([
//     {
//         "$lookup": {
//             "from": "products",
//             "localField": "productId",
//             "foreignField": "_id",
//             "as": "products"
//         }
//     },
//     {
//         "$unwind": "$products"
//     },
//     {
//         "$group": {
//             "_id": {
//                 "productId": '$productId',
//                 "categoryId": "$products.categoryId"
//             },
//             "countProduct": {
//                 "$sum": "$count"
//             },
//             "doc": {
//                 "$push": {"productName": "$products.productName"}
//             }
//         }
//     },
//     {
//         "$sort": {"countProduct": -1}
//     }
// ])

// db.products.aggregate([
//     {
//         "$lookup": {
//             "from": "order_products",
//             "localField": "_id",
//             "foreignField": "productId",
//             "as": "order_products"
//         }
//     },
//     {
//         "$unwind": "$order_products"
//     },
//     {
//         "$lookup": {
//             "from": "categories",
//             "localField": "categoryId",
//             "foreignField": "_id",
//             "as": "categories"
//         }
//     },
//     {
//         "$unwind": "$categories"
//     },
//     {
//         "$group": {
//             "_id": {
//                 "productId": '$_id',
//                 "categoryId": "$categoryId"
//             },
//             "countProduct": {
//                 "$sum": "$order_products.count"
//             },
//             "infor": {
//                 "$push": {"productName": "$productName", "categoryName": "$categories.categoryName", "id": "$_id"}
//             }
//         }
//     },
//     {
//         "$unwind": "$infor"
//     },
//     {
//         "$sort": {"countProduct": -1}
//     }
// ])
