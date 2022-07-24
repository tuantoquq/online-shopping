import mongoose from 'mongoose';
import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/customError.js';
import { Product, Category } from '../model/index.js';
import CategoryService from '../service/category.service.js';
// import bm25 from 'wink-bm25-text-search';
// import winkNLP from 'wink-nlp';
// import model from 'wink-eng-lite-web-model';
import ProductService from '../service/product.service.js';
import ShopService from '../service/shop.service.js';
import StringUtils from '../utils/stringUtils.js';

export const getProductById = async (req, res) => {
    try {
        let productId = req.query.productId;
        let productFind = await Product.findById(productId);

        if (productFind == null) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: apiStatus.INVALID_PARAM,
                message: 'Product not found',
            });
        }
        return res.status(httpStatus.OK).json({
            status: apiStatus.SUCCESS,
            message: 'get products successfully',
            data: productFind,
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
};

// productController.search = async (req, res) => {
//     try {
//         var engine = bm25();
//         const nlp = winkNLP(model);
//         const its = nlp.its;

//         const prepTask = function (text) {
//             const tokens = [];
//             nlp.readDoc(text)
//                 .tokens()
//                 // Use only words ignoring punctuations etc and from them remove stop words
//                 .filter((t) => t.out(its.type) === 'word' && !t.out(its.stopWordFlag))
//                 // Handle negation and extract stem of the word
//                 .each((t) =>
//                     tokens.push(
//                         t.out(its.negationFlag) ? '!' + t.out(its.stem) : t.out(its.stem),
//                     ),
//                 );

//             return tokens;
//         };
//         engine.defineConfig({ fldWeights: { productName: 2, shortDescription: 1 } });
//         engine.definePrepTasks([prepTask]);

//         for await (const product of Product.find()) {
//             let doc = JSON.parse(
//                 JSON.stringify({
//                     productName: product.productName,
//                     shortDescription: product.shortDescription,
//                     tags: product._id,
//                 }),
//             );
//             engine.addDoc(doc, product._id);
//         }
//         engine.consolidate();

//         const { query } = req.body;
//         var result = engine.search(query);
//         let ids = [];
//         for (let i = 0; i < result.length; i++) {
//             ids.push(result[i][0]);
//         }
//         const documents = await Product.find({ _id: { $in: ids } });
//         return res.status(httpStatus.OK).json({
//             status: apiStatus.SUCCESS,
//             message: "search product successfully",
//             data: documents,
//         });
//     } catch (e) {
//         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//             status: apiStatus.OTHER_ERROR,
//             message: e.message,
//         });
//     }
// };

export const filterProduct = async (req, res) => {
    try {
        let currentPage = req.body.currentPage ? req.body.currentPage : 1;
        let maxItem = req.body.maxItem ? req.body.maxItem : 20;
        let skip = (currentPage - 1) * maxItem;

        let listPros = [
            'query',
            'categoryName',
            'startPrice',
            'endPrice',
            'minRating',
            'orderBy',
            'sortBy',
        ];
        let query = [];
        for (let i = 0; i < listPros.length; i++) {
            let property = listPros[i];
            // eslint-disable-next-line no-prototype-builtins
            if (req.body.hasOwnProperty(property)) {
                if (property == 'query') {
                    query.push({
                        $match: {
                            $or: [
                                {
                                    productName: {
                                        $regex: req.body[property],
                                        $options: 'i',
                                    },
                                },
                                {
                                    shortDescription: {
                                        $regex: req.body[property],
                                        $options: 'i',
                                    },
                                },
                            ],
                        },
                    });
                } else if (property == 'categoryName') {
                    var categories = await Category.find({
                        categoryName: { $in: req.body['categoryName'] },
                    });
                    if (!categories) {
                        return res.status(httpStatus.OK).json({
                            status: apiStatus.OTHER_ERROR,
                            message: 'Not found category',
                        });
                    }
                    let categoriIds = [];
                    for (let i = 0; i < categories.length; i++) {
                        categoriIds.push(categories[i]._id);
                    }
                    query.push({
                        $match: { categoryId: { $in: categoriIds } },
                    });
                } else if (property == 'startPrice') {
                    if (req.body.hasOwnProperty('endPrice')){
                        query.push({
                            $match: {
                                price: {
                                    $lte: req.body['endPrice'],
                                    $gte: req.body['startPrice'],
                                },
                            },
                        });
                    }
                    else{
                        query.push({
                            $match: {
                                price: {
                                    $gte: req.body['startPrice'],
                                },
                            },
                        });
                    }
                    
                } else if (property == 'minRating') {
                    query.push({
                        $match: { ratingStar: { $gte: req.body['minRating'] } },
                    });
                } else if (property == 'orderBy') {
                    let sortby = req.body.sortBy == 'desc' ? -1 : 1;
                    if (req.body[property] == 'price') {
                        query.push({
                            $sort: { price: sortby },
                        });
                    } else if (req.body[property] == 'pho bien') {
                        query.push({
                            $sort: { soldHistory: sortby },
                        });
                    } else if (req.body[property] == 'moi nhat') {
                        query.push({
                            $sort: { createAt: sortby },
                        });
                    } else if (req.body[property] == 'rating') {
                        query.push({
                            $sort: { ratingStar: sortby },
                        });
                    } else {
                        return res.status(httpStatus.OK).json({
                            message: 'order by ' + req.body['orderBy'] + " isn't support",
                            status: apiStatus.OTHER_ERROR,
                        });
                    }
                }
            }
        }
        let queryCount = JSON.parse(JSON.stringify(query))
        queryCount.push({
            $count: "countDocument"
        })
        let maxDocuments = await Product.aggregate(queryCount)
        console.log(maxDocuments);
        maxDocuments = maxDocuments[0]['countDocument']

        let countPage = 0;
        if (maxDocuments % maxItem == 0) {
            countPage = maxDocuments / maxItem;
        } else {
            countPage = ~~(maxDocuments / maxItem) + 1;
        }
        let productIds = await Product.aggregate(query)
            .skip(skip)
            .limit(maxItem)
            .project({
                _id: 1, // By default
            });
        return res.status(httpStatus.OK).json({
            status: apiStatus.SUCCESS,
            message: 'filter products successfully',
            data: productIds,
            maxPage: countPage,
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
};

export const getTop6SellingProduct = async (req, res) => {
    try {
        let top6Products = await ProductService.getTop6Selling();
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'get top 6 selling product successfully',
            data: top6Products,
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

export const getTop30RecommendProducts = async (req, res) => {
    try {
        let top30RecommendProducts = await ProductService.getTop30RecommendProducts();
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'get top 30 recommend products successfully',
            data: top30RecommendProducts,
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

export const addProduct = async (req, res, next) => {
    try {
        let categoryId = req.body.categoryId;
        //check exist category
        let category = await CategoryService.findCategoryById(categoryId);

        let shopperId = req.userId;
        //check exist shop with shopper id
        let shop = await ShopService.findShopByShopperId(shopperId);
        if(shop.status !== 1){
            return res.status(httpStatus.BAD_GATEWAY).send({
                status: apiStatus.INVALID_PARAM,
                message: "Your shop is waiting for admin accept register! Try later."
            });
        }
        //upload images
        let imageFiles = req.files;
        for(const file of imageFiles){
            if(!file.mimetype.startsWith("image/")){
                return res.status(httpStatus.BAD_REQUEST).send({
                    status: apiStatus.INVALID_PARAM,
                    message: "Only support image file!"
                });
            }
        }
        //check file extensions
        if (!imageFiles) {
            const error = new Error('Upload file again!');
            error.httpStatusCode = 400;
            return next(error);
        }

        let imageUrls = [];
        for (let i = 0; i < imageFiles.length; i++) {
            imageUrls.push(`${process.env.IMAGE_PRE_PATH}/${imageFiles[i].filename}`);
        }
        let lastProduct = await ProductService.getLastProduct();
        let productId = lastProduct.productId + 1;
        let productCode = await generateCodes();
        let productRequest = new Product({
            productName: req.body.productName,
            productId: productId,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
            price: parseFloat(req.body.price),
            soldHistory: parseFloat(req.body.soldHistory),
            imageUrls: imageUrls,
            codes: productCode,
            productUrl: `http://localhost:3000/products?pid=${productId}`,
            count: parseInt(req.body.count),
            sizes: req.body.sizes,
            ratingStar: 0,
            ratingCount: 0,
            categoryId: category._id,
            shopId: shop._id,
            createAt: Date.now(),
            updateAt: Date.now(),
        });
        let newProduct = await ProductService.addProduct(productRequest);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'add product successfully',
            data: newProduct,
        });
    } catch (err) {
        console.log(err)
        if (err instanceof CustomError) {
            return res.status(err.httpStatus).send({
                status: err.apiStatus,
                message: err.message,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

export const getListProductOfCategory = async (req, res) => {
    const categoryName = req.body.categoryName 
    let currentPage = req.body.currentPage ? req.body.currentPage : 1;
    let maxItem = req.body.maxItem ? req.body.maxItem : 20;
    try {
        let category = await Category.findOne({categoryName: categoryName})
        if(!category){
            return res.status(httpStatus.OK).json({
                message: "Not exist category name",
                data: []
            })
        }
        let categoryId = category._id
        let productsRes = await ProductService.getListProductOfCategory(categoryId, currentPage, maxItem)
        return res.status(httpStatus.OK).json({
            message: "Success",
            data: productsRes
        })
    }
    catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        let productId = req.params.productId;
        let listProps = [
            'productName',
            'longDescription',
            'shortDescription',
            'price',
            'soldHistory',
            'imageUrls',
            'count',
            'sizes',
            'ratingStart',
            'ratingCount',
            'categoryId',
        ];
        let productRequest = {};
        for (let i = 0; i < listProps.length; i++) {
            let props = listProps[i];
            // eslint-disable-next-line no-prototype-builtins
            if (req.body[props] !== undefined) {
                switch (props) {
                    case 'categoryId':
                        // eslint-disable-next-line no-case-declarations
                        const categoryId = req.body.categoryId;
                        //check category exist
                        // eslint-disable-next-line no-case-declarations
                        let category = await CategoryService.findCategoryById(categoryId);
                        productRequest[props] = category._id;
                        break;
                    case 'productName':
                    case 'longDescription':
                    case 'shortDescription':
                        productRequest[props] = req.body[props];
                        break;
                    case 'price':
                    case 'ratingStart':
                        productRequest[props] = parseFloat(req.body[props]);
                        break;
                    case 'count':
                    case 'soldHistory':
                    case 'ratingCount':
                        productRequest[props] = parseInt(req.body[props]);
                        break;
                    case 'sizes':
                        productRequest[props] = JSON.parse(req.body[props]);
                        break;
                }
            }
        }
        if (req.files !== undefined && req.files.length > 0) {
            //upload images
            let imageFiles = req.files;
            //check file extensions
            for(const file of imageFiles){
                if(!file.mimetype.startsWith("image/")){
                    return res.status(httpStatus.BAD_REQUEST).send({
                        status: apiStatus.INVALID_PARAM,
                        message: "Only support image file!"
                    });
                }
            }
            if (!imageFiles) {
                const error = new Error('Upload file again!');
                error.httpStatusCode = 400;
                return next(error);
            }

            let imageUrls = [];
            for (let i = 0; i < imageFiles.length; i++) {
                imageUrls.push(`${process.env.IMAGE_PRE_PATH}/${imageFiles[i].filename}`);
            }
            productRequest['imageUrls'] = imageUrls;
        }
        let updateProduct = await ProductService.updateProduct(productRequest, productId);

        return res.status(httpStatus.OK).send({
            status: apiStatus.OK,
            message: 'update product successfully',
            data: updateProduct,
        });
    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.httpStatus).send({
                status: err.apiStatus,
                message: err.message,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        let deleteProduct = await ProductService.deleteProduct(productId);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'delete product successfully',
            data: deleteProduct,
        });
    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.httpStatus).send({
                status: err.apiStatus,
                message: err.message,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
};

async function generateCodes() {
    let res = StringUtils.generateProductCode();
    let check = await ProductService.checkExistCode(res);
    while (check) {
        generateCodes();
    }
    return res;
}


// db.categories.aggregate([
//     {
//         $lookup: {
//             "from": "products",
//             "localField": "_id",
//             "foreignField": "categoryId",
//             "as": "products"
//         }
//     },
//     {
//         "$match": {
//             "categoryName": "Đồ Chơi - Mẹ & Bé"
//         }
//     },
// ])
