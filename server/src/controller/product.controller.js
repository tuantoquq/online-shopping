import { httpStatus, apiStatus } from '../constants/index.js';
import { Product, Category } from '../model/index.js';
// import bm25 from 'wink-bm25-text-search';
// import winkNLP from 'wink-nlp';
// import model from 'wink-eng-lite-web-model';
import ProductService from '../service/product.service.js';

const productController = {};

productController.insertProductToDatabase = async (req, res) => {
    try {
        const {
            productName,
            longDescription,
            shortDescription,
            price,
            codes,
            count,
            sizes,
            categoryName,
            shopId,
        } = req.body;

        let category = new Category({
            categoryName: categoryName,
        });

        try {
            console.log(productName);
            console.log(shopId);
            let product = await Product.findOne({
                productName: productName,
                shopId: shopId,
            });
            const categorySave = await category.save();
            if (product) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: apiStatus.INVALID_PARAM,
                    message: 'Product has been exist in this Shop',
                });
            }
            let newProduct = new Product({
                productName: productName,
                longDescription: longDescription,
                shortDescription: shortDescription,
                price: price,
                codes: codes,
                count: count,
                shopId: shopId,
                sizes: sizes,
                categoryId: categorySave._id,
            });
            console.log(newProduct);

            const productSave = await newProduct.save();
            return res.status(httpStatus.CREATED).json({
                status: apiStatus.SUCCESS,
                message: 'add product successfully!',
                data: productSave,
            });
        } catch (e) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: apiStatus.OTHER_ERROR,
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

productController.getProductFromDatabase = async (req, res) => {
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

productController.deleteProductFromDatabase = async (req, res) => {
    try {
        console.log(req.body.productId);
        let product = await Product.findByIdAndRemove(req.query.productId);
        if (product == null) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: apiStatus.INVALID_PARAM,
                message: "Can't find product",
            });
        }

        return res.status(httpStatus.OK).json({
            status: apiStatus.SUCCESS,
            message: 'Delete product done',
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
};

productController.updateProductFromDatabase = async (req, res) => {
    try {
        let productId = req.query.productId;
        var dataUpdate = {};
        let listPros = [
            'productName',
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
            let pros = listPros[i];
            // eslint-disable-next-line no-prototype-builtins
            if (req.body.hasOwnProperty(pros)) {
                dataUpdate[pros] = req.body[pros];
            }
        }
        dataUpdate['updateAt'] = Date.now();
        let product = await Product.findByIdAndUpdate(productId, dataUpdate);
        if (!product) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: apiStatus.INVALID_PARAM,
                message: "Can't find product",
            });
        }
        return res.status(httpStatus.OK).json({
            status: apiStatus.SUCCESS,
            message: 'update product successfully',
            data: product,
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message,
        });
    }
};
// productController.search = async (req, res) => {
//     try{
//         const { query } = req.body
//         const documents = await Product.find({
//             $or: [{productName: {$regex: query, $options: 'i'}}, {shortDescription: {$regex: query, $options: 'i'}}]
//         })
//         if(!documents){
//             return res.status(httpStatus.OK).json({
//                 status: apiStatus.SUCCESS,
//                 message: "Not found documents",
//                 data: []
//             })
//         }
//         var listIds = []
//         for(let i =0; i< documents.length; i++){
//             listIds.push(documents[i]._id)
//         }
//         return res.status(httpStatus.OK).json({
//             status: apiStatus.SUCCESS,
//             data: listIds
//         })

//     }
//     catch (e) {
//         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//             status: apiStatus.OTHER_ERROR,
//             message: e.message,
//         });
//     }
// }

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

productController.filter = async (req, res) => {
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
        console.log(req.body['categoryName']);
        let query = [];
        for (let i = 0; i < listPros.length; i++) {
            let property = listPros[i];
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
                    console.log(categoriIds);
                    query.push({
                        $match: { categoryId: { $in: categoriIds } },
                    });
                } else if (property == 'startPrice') {
                    query.push({
                        $match: {
                            price: {
                                $lte: req.body['endPrice'],
                                $gte: req.body['startPrice'],
                            },
                        },
                    });
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

        console.log(query);
        const maxDocuments = await Product.aggregate(query).length;
        console.log(maxDocuments);

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

        // let categoryName = req.body.categoryName;
        // let category = await Category.findOne({ categoryName: categoryName });
        // if (!category) {
        //     return res.status(httpStatus.OK).json({
        //         status: apiStatus.INVALID_PARAM,
        //         message: 'Category not found',
        //     });
        // } else {
        //     let sortBy = req.body.sortBy ? req.body.sortBy : null;
        //     let products = null;
        //     console.log(sortBy);
        //     if (sortBy == null) {
        //         products = await Product.find({ categoryId: category._id })
        //             .skip(skip)
        //             .limit(maxItem);
        //     } else {
        //         let orderBy = req.body.orderBy == 'desc' ? -1 : 1;
        //         if (sortBy == 'price') {
        //             products = await Product.find({})
        //                 .sort({ price: orderBy })
        //                 .skip(skip)
        //                 .limit(maxItem);
        //         } else if (sortBy == 'pho bien') {
        //             products = await Product.find({})
        //                 .sort({ soldHistory: orderBy })
        //                 .skip(skip)
        //                 .limit(maxItem);
        //         } else if (sortBy == 'moi nhat') {
        //             products = await Product.find({})
        //                 .sort({ createAt: -1 })
        //                 .skip(skip)
        //                 .limit(maxItem);
        //         }
        //     }
        //     if (!products) {
        //         return res.status(httpStatus.OK).json({
        //             status: apiStatus.INVALID_PARAM,
        //             message: "We don't have any product belong to this category",
        //         });
        //     }
        // }
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
};

productController.getTop6SellingProduct = async (req, res) => {
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

productController.getTop30RecommendProducts = async (req, res) => {
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

export default productController;
