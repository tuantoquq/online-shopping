import { httpStatus, apiStatus } from '../constants/index.js';
import { Product, Category } from '../model/index.js';
import bm25 from 'wink-bm25-text-search';
import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';

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
                data: productSave,
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

productController.getProductFromDatabase = async (req, res) => {
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

productController.deleteProductFromDatabase = async (req, res) => {
    try {
        console.log(req.body.productId)
        let product = await Product.findByIdAndRemove(req.query.productId);
        if (product == null) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Can't find product",
            });
        }

        return res.status(httpStatus.OK).json({
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
        let product = await Product.findOneAndUpdate({ _id: productId }, dataUpdate);
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

productController.search = async (req, res) => {
    try {
        var engine = bm25();
        const nlp = winkNLP(model);
        const its = nlp.its;

        const prepTask = function (text) {
            const tokens = [];
            nlp.readDoc(text)
                .tokens()
                // Use only words ignoring punctuations etc and from them remove stop words
                .filter((t) => t.out(its.type) === 'word' && !t.out(its.stopWordFlag))
                // Handle negation and extract stem of the word
                .each((t) =>
                    tokens.push(
                        t.out(its.negationFlag) ? '!' + t.out(its.stem) : t.out(its.stem),
                    ),
                );

            return tokens;
        };
        engine.defineConfig({ fldWeights: { productName: 2, shortDescription: 1 } });
        engine.definePrepTasks([prepTask]);

        for await (const product of Product.find()) {
            let doc = JSON.parse(
                JSON.stringify({
                    productName: product.productName,
                    shortDescription: product.shortDescription,
                    tags: product._id,
                }),
            );
            engine.addDoc(doc, product._id);
        }
        engine.consolidate();

        const { query } = req.body;
        var result = engine.search(query);
        let ids = [];
        for (let i = 0; i < result.length; i++) {
            ids.push(result[i][0]);
        }
        const documents = await Product.find({ _id: { $in: ids } });
        return res.status(httpStatus.OK).json({
            data: documents,
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
};


productController.filter = async (req, res) => {
    try{
        let currentPage = req.body.currentPage ? req.body.currentPage :1
        let maxItem = req.body.maxItem? req.body.maxItem : 20
        let skip = (currentPage - 1) * maxItem

        let categoryName = req.body.categoryName
        let category = await Category.findOne({'categoryName': categoryName})
        if (!category){
            return res.status(httpStatus.OK).json({
                message: "Category not found"
            })
        }
        else{
            let sortBy = req.body.sortBy? req.body.sortBy : null
            let products = null
            console.log(sortBy)
            if(sortBy == null){
                products = await Product.find({'categoryId': category._id}).skip(skip).limit(maxItem)
            }
            else{
                let orderBy = req.body.orderBy == 'desc' ? -1 : 1 
                if(sortBy == 'price'){
                    products = await Product.find({}).sort({'price': orderBy}).skip(skip).limit(maxItem)
                }
                else if(sortBy == 'pho bien'){
                    products = await Product.find({}).sort({'soldHistory': orderBy}).skip(skip).limit(maxItem)
                }
                else if(sortBy == 'moi nhat'){
                    products = await Product.find({}).sort({'createAt': -1}).skip(skip).limit(maxItem)
                }
            }
            if(!products){
                return res.status(httpStatus.OK).json({
                    message: "We don't have any product belong to this category"
                })
            }
            return res.status(httpStatus.OK).json({
                data: products
            })
        }
    }
    catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }
}

export default productController;
