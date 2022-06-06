import { httpStatus, apiStatus } from '../constants/index.js';
<<<<<<< HEAD
import { Product } from '../model/index.js';
import { Category } from '../model/category.js';
=======
import { Product, Category } from '../model/index.js';
>>>>>>> fix bug

const productControler = {};

productControler.insertProductToDatabase = async (req, res) => {
    try {
        const {
<<<<<<< HEAD
            productName,
            longDescription,
=======
            name,
            longDescription,
            shortDescription,
>>>>>>> fix bug
            price,
            codes,
            count,
            sizes,
            categoryName,
            shopId,
        } = req.body;

<<<<<<< HEAD
        category = new Category({
=======
        let category = new Category({
>>>>>>> fix bug
            categoryName: categoryName,
        });

        try {
<<<<<<< HEAD
            const categorySave = await category.save();
            let product = await Product.findOne({
                productName: productName,
                shopId: shopId,
            });

=======
            console.log(name)
            console.log(shopId)
            let product = await Product.findOne({
                name: name,
                shopId: shopId,
            });
            const categorySave = await category.save();
>>>>>>> fix bug
            if (product) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    message: 'Product has been exist in this Shop',
                });
            }
            let newProduct = new Product({
                name: name,
                longDescription: longDescription,
                shortDescription: shortDescription,
                price: price,
                codes: codes,
                count: count,
                shopId: shopId,
                sizes: sizes,
                catergoryId: categorySave._id,
            });
<<<<<<< HEAD

            const productSave = product.save();
            return res.status(httpStatus.OK).json({
                data: productSave,
=======
            console.log(newProduct)

            const productSave = await newProduct.save();
            return res.status(httpStatus.CREATED).json({
                data: productSave
>>>>>>> fix bug
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
<<<<<<< HEAD
=======

>>>>>>> fix bug

productControler.getProductFromDatabase = async (req, res) => {
    try {
        let productId = req.query.productId;
        let productFind = await Product.findById(productId);

        if (productFind == null) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: 'Product not found',
            });
        }
        return res.status(httpStatus.OK).json({
            data: productFind,
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
};

productControler.deleteProductFromDatabse = async (req, res) => {
    try {
        let product = await Product.findByIdAndRemove(req.query.productId);
        if (product == null) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Can't find product",
            });
        }

<<<<<<< HEAD
        return req.status(httpStatus.OK).json({
            message: 'Delte product done',
=======
        return res.status(httpStatus.OK).json({
            message: 'Delete product done',
>>>>>>> fix bug
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
};

productControler.updateProductFromDatabase = async (req, res) => {
    try {
<<<<<<< HEAD
        let productId = req.productId;
        const dataUpdate = {};
=======
        let productId = req.query.productId;
        var dataUpdate = {};
>>>>>>> fix bug
        let listPros = [
            'name',
            'longDescription',
            'shortDescription',
            'price',
            'codes',
            'count',
            'sizes',
            'ratingStart',
            'ratingCount',
        ];

        for (let i = 0; i < listPros.length; i++) {
<<<<<<< HEAD
            if (req.body.hasOwnProperty(pro)) {
                dataUpdate[pro] = req.body[pro];
            }
        }
        dataUpdate['updateAt'] = Date.now();
        product = await Product.findOneAndUpdate({ _id: productId }, dataUpdate);
=======
            let pros = listPros[i]
            if (req.body.hasOwnProperty(pros)) {
                dataUpdate[pros] = req.body[pros];
            }
        }
        dataUpdate['updateAt'] = Date.now();
        let product = await Product.findOneAndUpdate({ _id: productId }, dataUpdate);
>>>>>>> fix bug
        if (!product) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Can't find product",
            });
        }
        return res.status(httpStatus.OK).json({
            data: product,
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message,
        });
    }
};

export default productControler;
