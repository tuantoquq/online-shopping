import { httpStatus, apiStatus } from '../constants/index.js';
import { Category } from '../model/index.js';

const categoryControler = {};

categoryControler.insertCategoryToDatabase = async (req, res) => {
    try {
        const { categoryName } = req.body;

        let category = await Category.findOne({
            categoryName: categoryName,
        });
        if (category) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Category name has exist',
            });
        }

        category = new Category({
            categoryName: categoryName,
        });

        try {
            const categorySave = await category.save();
            res.status(httpStatus.CREATED).json({
                data: categorySave,
            });
        } catch (e) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: e.message,
            });
        }
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
};

categoryControler.getCategoryFromDatabase = async (req, res) => {
    try {
        let categoryId = req.query.categoryId;
        let categoryFind = await Category.findById(categoryId);

        if (categoryFind == null) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: 'Category not found',
            });
        }
        return res.status(httpStatus.OK).json({
            data: categoryFind,
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
};

categoryControler.deleteCategoryFromDatabse = async (req, res) => {
    try {
        let category = await Category.findByIdAndRemove(req.query.categoryId);
        if (category == null) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Can't find category",
            });
        }

        return res.status(httpStatus.OK).json({
            message: 'Delte category done',
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
};

categoryControler.updateCategoryFromDatabase = async (req, res) => {
    try {
        const { categoryId, categoryName } = req.body;
        var dataUpdate = {};
        dataUpdate['categoryName'] = categoryName;
        dataUpdate['updateAt'] = Date.now();
        let category = await Category.findByIdAndUpdate(categoryId, dataUpdate);
        if (!category) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Can't find category",
            });
        }
        return res.status(httpStatus.OK).json({
            data: category,
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message,
        });
    }
};

export default categoryControler;
