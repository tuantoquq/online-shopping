import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/customError.js';
import Category from '../model/category.js';

const CategoryService = {};
CategoryService.findCategoryById = async (categoryId) => {
    let category = await Category.findById(categoryId);
    if (!category) {
        throw new CustomError(
            httpStatus.INTERNAL_SERVER_ERROR,
            apiStatus.DATABASE_ERROR,
            `Did not find category with id: ${categoryId}`,
        );
    }
    return category;
};

export default CategoryService;
