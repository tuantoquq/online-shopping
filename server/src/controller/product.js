import { httpStatus, apiStatus } from '../constants/index.js';
import { Product } from '../model/index.js';
import { Category } from '../model/category.js'

const productControler = {}

productControler.insertProductToDatabase = async (req, res) => {
    try {
        const {
            productName,
            longDescription, 
            price,
            codes,
            count,
            sizes,
            categoryName, 
            shopId
        } = req.body

        category = new Category({
            categoryName: categoryName
        })

        try {
            const categorySave = await category.save()
            let product = await Product.findOne({
                productName: productName,
                shopId: shopId
            })

            if(product){
                return res.status(httpStatus.BAD_REQUEST).json({
                    message: "Product has been exist in this Shop"
                })
            }
            product = new Product({
                productName: productName,
                longDescription: longDescription,
                price: price,
                codes: codes,
                count: count,
                shopId: shopId,
                sizes: sizes,
                catergoryId: categorySave._id
            })

            const productSave = product.save()
            return res.status(httpStatus.OK).json({
                data: productSave
            })
        }
        catch (e) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: e.message
            })
        }

    }
    catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message
        })
    }
}


productControler.getProductFromDatabase = async (req, res) => {
    try {
        let productId = req.query.productId
        let productFind = await Product.findById(productId)

        if (productFind == null ){
            return res.status(httpStatus.NOT_FOUND).json({
                message : "Product not found"
            })
        }
        return res.status(httpStatus.OK).json({
            data: productFind
        })
    }
    catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message
        })
    }
}


productControler.deleteProductFromDatabse = async (req, res) => {
    try {
        let product = await Product.findByIdAndRemove(req.query.productId)
        if (product == null){
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Can't find product"
            })
        }

        return req.status(httpStatus.OK).json({
            message: "Delte product done"
        })
    }
    catch (e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message
        })
    }
}


productControler.updateProductFromDatabase = async (req, res) => {
    try {
        let productId = req.productId 
        const dataUpdate = {}
        let listPros = [
            'productName',
            'longDescription',
            'price',
            'codes',
            'count',
            'sizes',
            'ratingStart',
            'ratingCount'
        ]

        for(let i=0; i < listPros.length; i++){
            if(req.body.hasOwnProperty(pro)){
                dataUpdate[pro] = req.body[pro]
            }
        }
        dataUpdate['updateAt'] = Date.now()
        product = await Product.findOneAndUpdate({_id: productId}, dataUpdate)
        if(!product){
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Can't find product"
            })
        }
        return res.status(httpStatus.OK).json({
            data: product
        })
    }
    catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message : e.message
        })
    }
}

export default productControler;