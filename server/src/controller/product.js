import { httpStatus, apiStatus } from '../constants/index.js';
import { Product } from '../model/index.js';

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
            shopName, 
            categoryName

        } = req.body

        let product = await Product.findOne({
            productName: productName
        })
        if (category) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "Category name has exist"
            })
        }

        category = new Category({
            categoryName: categoryName,
            createAt: createAt,
            updateAt: updateAt
        })

        try {
            const categorySave = await category.save()
            res.status(httpStatus.CREATED).json({
                data: {
                    id: categorySave._id,
                    categoryName: categoryName,
                    createAt: createAt,
                    updateAt: updateAt
                }
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


categoryControler.getCategoryFromDatabase = async (req, res) => {
    try {
        let categoryId = req.categoryId
        console.log(categoryId)
        let categoryFind = await Category.findById(categoryId)

        if (categoryFind == null ){
            return res.status(httpStatus.NOT_FOUND).json({
                message : "Category not found"
            })
        }
        return res.status(httpStatus.OK).json({
            data: categoryFind
        })
    }
    catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message
        })
    }
}


categoryControler.deleteCategoryFromDatabse = async (req, res) => {
    try {
        let category = await Category.findByIdAndRemove(req.params.id)
        if (category == null){
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Can't find category"
            })
        }

        return req.status(httpStatus.OK).json({
            message: "Delte category done"
        })
    }
    catch (e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message
        })
    }
}


categoryControler.updateCategoryFromDatabase = async (req, res) => {
    try {
        const {
            categoryId,
            categoryName
        } = req.body 
        dataUpdate = {}
        dataUpdate['updateAt'] = Date.now()
        category = await Category.findOneAndUpdate({
            _id: categoryId, 
            dataUpdate
        })
        if (!category) {
            return res.status(httpStatus.NOT_FOUND).json({
                message : "Can't find category"
            })
        }
        return  res.status(httpStatus.OK).json({
            data:  category
        })
    }
    catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message : e.message
        })
    }
}

export default categoryControler;