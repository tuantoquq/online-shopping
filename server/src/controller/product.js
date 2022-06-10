import { httpStatus, apiStatus } from '../constants/index.js';
<<<<<<< HEAD
import { Product } from '../model/index.js';
import { Category } from '../model/category.js';
=======
import { Product, Category } from '../model/index.js';
<<<<<<< HEAD
>>>>>>> fix bug
=======
import bm25 from 'wink-bm25-text-search';
import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';
>>>>>>> update: product searcher

const productControler = {};

productControler.insertProductToDatabase = async (req, res) => {
    try {
        const {
<<<<<<< HEAD
<<<<<<< HEAD
            productName,
            longDescription,
=======
            name,
=======
            productName,
>>>>>>> update: product searcher
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
<<<<<<< HEAD
            const categorySave = await category.save();
            let product = await Product.findOne({
                productName: productName,
                shopId: shopId,
            });

=======
            console.log(name)
=======
            console.log(productName)
>>>>>>> update: product searcher
            console.log(shopId)
            let product = await Product.findOne({
                productName: productName,
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
                productName: productName,
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


productControler.search = async (req, res) => {
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
            let doc = JSON.parse(JSON.stringify({'productName': product.productName, 'shortDescription': product.shortDescription, tags: product._id}))
            engine.addDoc(doc, product._id);
        }
        engine.consolidate();

        const { query } = req.body
        var result = engine.search(query)
        let ids = []
        for(let i = 0; i<result.length; i++){
            ids.push(result[i][0])
        }
        const documents = await Product.find({'_id': {$in: ids}})
        return res.status(httpStatus.OK).json({
            data: documents
        })
    } catch(e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: apiStatus.OTHER_ERROR,
            message: e.message,
        });
    }

}
export default productControler;
