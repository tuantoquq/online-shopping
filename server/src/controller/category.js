import { httpStatus, apiStatus } from '../constants/index.js';
import { Category } from '../model/index.js';

export const insertCategoryToDatabase = async (req, res) => {
    try {
        const {
            categoryName,
            createAt, 
            updateAt
        } = req.body

        let category = await Category.findOne({
            categoryName: categoryName
        })
        if (category) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "Category name has exist"
            })
        }

        categorySample = new Category({
            categoryName: categoryName,
            createAt: createAt,
            updateAt: updateAt
        })

        try {
            const categorySave = await categorySample.save()
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