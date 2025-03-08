import mongoose from "mongoose";
import { Action, Buy, BuyProduct, Product } from "../models/models.js";


class buyController {

    async get(req, res, next) {

        try {

            const { _id } = req.params;

            const buy = await Buy.findById(_id).populate({
                path: 'products',
                populate: {
                    path: 'product'
                }
            })

            if (!buy) return res.status(404).json({ message: "Order not found." });

            res.status(200).json(buy);

        } catch (error) {
            next(error)
        }

    }

    async getAll(req, res, next) {

        const { _id } = req.params;

        try {

            const buys = await Buy.find().populate({
                path: 'products',
                populate: {
                    path: 'product'
                }
            })

            res.status(200).json(buys);

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

            const buys = await BuyProduct.find(query).populate({
                path: 'product',
                populate: {
                    path: 'product'
                }
            })

            res.status(200).json(buys);

        } catch (error) {
            next(error)
        }

    }

    async create(req, res, next) {

        try {

            const { products, date, status } = req.body;

            const newDate = date ? new Date(date) : new Date();
            const newStatus = status ? "arrived" : "pending";


            if (!products) return res.status(400).json({ message: "Order should have at least 1 product." });

            let price = 0;

            const seenIds = new Set();

            for (const product of products) {
                if (!product._id || !product.amount || !product.price || !product.amountInOne) {
                    return res.status(400).json({ message: `One of the products doesn't have all required parameters: ${product._id}` });
                }

                if (seenIds.has(product._id)) {
                    return res.status(400).json({ message: `Duplicate product detected with ID ${product._id}.` });
                }
                seenIds.add(product._id);

                const foundProduct = await Product.findById(product._id);
                if (!foundProduct) {
                    return res.status(404).json({ message: `Product with ID ${product._id} doesn't exist.` });
                }
            }

            const newProductsIds = [];


            for (const product of products) {

                const foundProduct = await Product.findById(product._id);

                await Product.findByIdAndUpdate(
                    product._id,
                    { $inc: { currentlyAvaliable: product.amount * product.amountInOne } },
                    { new: true }
                );

                price += product.amount * product.price;

                const buyProduct = await BuyProduct.create({
                    product: foundProduct._id,
                    amount: product.amount,
                    price: product.price,
                    amountInOne: product.amountInOne,
                    sold: 0
                });

                newProductsIds.push(buyProduct._id);

                const buyProducts = await BuyProduct.find({
                    product: foundProduct._id
                });

                let totalValue = 0;
                let totalQuantity = 0;
                let totalAmount = 0;
                let weightedPriceSum = 0;

                for (const buyProduct of buyProducts) {

                    const totalStockForEntry = buyProduct.amount * buyProduct.amountInOne;
                    const remainingStock = totalStockForEntry - buyProduct.sold;

                    if (remainingStock > 0) {
                        totalValue += (remainingStock * buyProduct.price) / buyProduct.amountInOne;
                        totalQuantity += remainingStock;
                    }

                    totalAmount += totalStockForEntry;
                    weightedPriceSum += buyProduct.amount * buyProduct.price;
                }

                const averagePriceLeft = totalQuantity > 0 ? totalValue / totalQuantity : 0;
                const averageBuyPrice = totalAmount > 0 ? weightedPriceSum / totalAmount : 0;

                await Product.findByIdAndUpdate(
                    foundProduct._id,
                    {
                        averageBuyPriceLeft: averagePriceLeft,
                        averageBuyPrice: averageBuyPrice
                    },
                    { new: true }
                );
            }

            const buy = await Buy.create({
                products: newProductsIds,
                date: newDate,
                status: newStatus,
                price
            })


            if (!buy) return res.status(400).json({ message: "Problem with creating buy order" });

            const foundBuy = await Buy.findById(buy._id).populate({
                path: 'products',
                populate: {
                    path: 'product',
                    populate: [
                        { path: 'type' },
                        { path: 'brand' }
                    ]
                }
            });

            const latestAction = await Action.findOne().sort({ createdAt: -1 });

            const action = await Action.create({
                type: "buy",
                refId: buy._id,
                previousAction: latestAction ? latestAction._id : null,
            });

            if (!action) return res.status(400).json({ message: "Problem with creating action" });

            return res.status(200).json(foundBuy);

        } catch (error) {
            next(error)
        }

    }


}

export default new buyController()