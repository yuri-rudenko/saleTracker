import { Action, Sale, SaleProduct, Product } from "../models/models.js";


class saleController {

    async get(req, res, next) {

        try {

            const {_id} = req.params;

            const sale = await Sale.findById(_id).populate({
                path: 'products',
                populate: {
                    path: 'product'
                }
            })

            if(!sale) return res.status(404).json({ message: "Order not found." });
            
            res.status(200).json(sale);
            
        } catch (error) {
            next(error)
        } 

    }

    async getAll(req, res, next) {

        try {

            const sales = await Sale.find().populate({
                path: 'products',
                populate: {
                    path: 'product',
                },
            })
            
            res.status(200).json(sales);
            
        } catch (error) {
            next(error)
        } 

    }

    async getAllProduct(req, res, next) {

        const { _id } = req.query;

        const query = {};
        if (_id) {
            try {
                query._id = new mongoose.Types.ObjectId(_id);
            } catch (error) {
                return res.status(400).json({ message: "Invalid _id format." });
            }
        }
        try {

            const sales = await SaleProduct.find(query).populate({
                path: 'product',
            })
            
            res.status(200).json(sales);
            
        } catch (error) {
            next(error)
        } 
    
    }

    async create(req, res, next) {

        try {

            const {products, date, type, status} = req.body;

            const newDate = date ? new Date(date) : new Date();
            const newType = type ? type : "Unknown";

            if(!products) return res.status(400).json({ message: "Order should have at least 1 product." });

            let price = 0;
            let amount = 0;

            for (const product of products) {
                if (!product._id || !product.amount || !product.price || !product.amountInOne) {
                    return res.status(400).json({ message: "One of the products doesn't have all required parameters." });
                }
                const foundProduct = await Product.findById(product._id);
                if (!foundProduct) {
                    return res.status(404).json({ message: `Product with ID ${product._id} doesn't exist.` });
                }
            }

            const newProductsIds = [];

            for (const product of products) {
                const foundProduct = await Product.findById(product._id);
    
                price += product.amount * product.price;
                amount += product.amount;
    
                const saleProduct = await SaleProduct.create({
                    product: foundProduct._id,
                    amount: product.amount,
                    price: product.price,
                    totalPrice: product.amount * product.price,
                });
    
                newProductsIds.push(saleProduct._id);
            }
            
            const sale = await Sale.create({
                products: newProductsIds,
                date: newDate,
                type: newType,
                price,
                amount,
                status
            })

            if(!sale) return res.status(400).json({ message: "Problem with creating sale order" });

            const latestAction = await Action.findOne().sort({ createdAt: -1 });

            const action = await Action.create({
                type: "sale",
                refId: sale._id,
                previousAction: latestAction ? latestAction._id : null, // Link to the latest action, or null if none exists
            });

            if(!action) return res.status(400).json({ message: "Problem with creating action" });

            return res.status(200).json(sale);
            
        } catch (error) {
            next(error)
        } 

    }

    async edit(req, res, next) {

        try {

            const {_id, ...fieldsToUpdate} = req.body;

            if(!_id) return res.status(400).json({ message: "Sale ID is required." });

            const editedSale = await Sale.findByIdAndUpdate(
                _id,
                fieldsToUpdate,
                { new: true }
            );

            if (!editedSale) {
                return res.status(404).json({ message: "Sale not found." });
            };

            res.status(200).json(editedSale);
            
        } catch (error) {

            next(error);

        }

    }


}

export default new saleController()