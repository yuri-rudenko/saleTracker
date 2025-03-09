import { Sale, SaleProduct, Product, BuyProduct } from "../models/models.js";


class saleController {

    async get(req, res, next) {

        try {

            const { _id } = req.params;

            const sale = await Sale.findById(_id).populate({
                path: 'products',
                populate: {
                    path: 'product',
                    populate: [
                        { path: 'type' },
                        { path: 'brand' }
                    ]
                }
            });

            if (!sale) return res.status(404).json({ message: "Order not found." });

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
                    populate: [
                        { path: 'type' },
                        { path: 'brand' }
                    ]
                }
            });

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
                populate: [
                    { path: 'type' },
                    { path: 'brand' }
                ]
            })

            res.status(200).json(sales);

        } catch (error) {
            next(error)
        }

    }

    async create(req, res, next) {
        try {
            const { products, date, type, status } = req.body;
    
            const newDate = date ? new Date(date) : new Date();
            const newType = type || "Unknown";
            const newStatus = status ? "Approved" : "Awaiting";
    
            if (!products?.length) {
                return res.status(400).json({ message: "Order should have at least 1 product." });
            }
    
            let price = 0;
            let amount = 0;
            const newProductsIds = [];
    
            for (const product of products) {
                if (!product._id || !product.amount || !product.price) {
                    return res.status(400).json({ message: "One of the products doesn't have all required parameters." });
                }
    
                const foundProduct = await Product.findById(product._id);
                if (!foundProduct) {
                    return res.status(404).json({ message: `Product with ID ${product._id} doesn't exist.` });
                }
    
                if (newStatus === "Approved" && foundProduct.currentlyAvaliable < product.amount) {
                    return res.status(400).json({ message: `Product ${product.name} has less than required amount.` });
                }
            }
    
            for (const product of products) {
                const foundProduct = await Product.findById(product._id);
    
                let totalCost = 0;
                let totalSold = 0;
    
                if (newStatus === "Approved") {
                    let remainingAmount = product.amount;
    
                    const buyProducts = await BuyProduct.find({
                        product: product._id,
                        $expr: { $lt: ["$sold", "$amount"] }
                    }).sort({ createdAt: 1 });
    
                    const bulkUpdates = [];
    
                    for (const buyProduct of buyProducts) {
                        if (remainingAmount <= 0) break;
    
                        let availableAmount = buyProduct.amount - buyProduct.sold;
                        let soldNow = Math.min(remainingAmount, availableAmount);
    
                        bulkUpdates.push({
                            updateOne: {
                                filter: { _id: buyProduct._id },
                                update: { $inc: { sold: soldNow } }
                            }
                        });
    
                        totalCost += soldNow * buyProduct.price;
                        totalSold += soldNow;
                        remainingAmount -= soldNow;
                    }
    
                    if (bulkUpdates.length) await BuyProduct.bulkWrite(bulkUpdates);
                }
    
                price += product.amount * product.price;
                amount += product.amount;
    
                const averageBuyPrice = totalSold > 0 ? totalCost / totalSold : 0;
    
                const saleProduct = await SaleProduct.create({
                    product: foundProduct._id,
                    averageBuyPrice,
                    amount: product.amount,
                    price: product.price,
                });
    
                newProductsIds.push(saleProduct._id);
    
                if (newStatus === "Approved") {
                    const updatedBuyProducts = await BuyProduct.find({
                        product: product._id,
                        $expr: { $lte: ["$sold", "$amount"] }
                    });
    
                    const saleProducts = await SaleProduct.find({ product: foundProduct._id });
    
                    let totalSellValue = 0;
                    let totalSellQuantity = 0;
    
                    for (const saleProduct of saleProducts) {
                        totalSellValue += saleProduct.amount * saleProduct.price;
                        totalSellQuantity += saleProduct.amount;
                    }
    
                    const averageSellPrice = totalSellQuantity > 0 ? totalSellValue / totalSellQuantity : 0;
    
                    let totalValue = 0;
                    let totalQuantity = 0;
    
                    for (const buyProduct of updatedBuyProducts) {
                        let remainingAmount = buyProduct.amount - buyProduct.sold;
                        totalValue += remainingAmount * buyProduct.price;
                        totalQuantity += remainingAmount;
                    }
    
                    const averageBuyPriceLeft = totalQuantity > 0 ? totalValue / totalQuantity : 0;
    
                    await Product.findByIdAndUpdate(
                        foundProduct._id,
                        {
                            averageBuyPriceLeft,
                            averageSellPrice,
                            $inc: { amountSold: product.amount, currentlyAvaliable: -product.amount },
                        },
                        { new: true }
                    );
                }
            }
    
            const sale = await Sale.create({
                products: newProductsIds,
                date: newDate,
                type: newType,
                price,
                amount,
                status: newStatus
            });
    
            const foundSale = await Sale.findById(sale._id).populate({
                path: 'products',
                populate: {
                    path: 'product',
                    populate: [
                        { path: 'type' },
                        { path: 'brand' }
                    ]
                }
            });
    
            if (!foundSale) return res.status(400).json({ message: "Problem with creating sale order" });
    
            return res.status(200).json(foundSale);
    
        } catch (error) {
            next(error);
        }
    }
    

    async edit(req, res, next) {

        try {

            const { _id, ...fieldsToUpdate } = req.body;

            if (!_id) return res.status(400).json({ message: "Sale ID is required." });

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

    async approveSale(req, res, next) {

        try {
            const saleId = req.params._id;

    
            const sale = await Sale.findById(saleId).populate("products");
            if (!sale) return res.status(404).json({ message: "Sale not found." });
    
            if (sale.status === "Approved") {
                return res.status(400).json({ message: "Sale is already approved." });
            }
    
            for (const saleProduct of sale.products) {
                const foundProduct = await Product.findById(saleProduct.product);
                if (!foundProduct) continue;
    
                if (foundProduct.currentlyAvaliable < saleProduct.amount) {
                    return res.status(400).json({ message: `Product ${foundProduct.name} has insufficient stock.` });
                }
    
                let remainingAmount = saleProduct.amount;
    
                const buyProducts = await BuyProduct.find({
                    product: foundProduct._id,
                    $expr: { $lt: ["$sold", "$amount"] }
                }).sort({ createdAt: 1 });
    
                const bulkUpdates = [];
                let totalCost = 0;
                let totalSold = 0;
    
                for (const buyProduct of buyProducts) {
                    if (remainingAmount <= 0) break;
    
                    let availableAmount = buyProduct.amount - buyProduct.sold;
                    let soldNow = Math.min(remainingAmount, availableAmount);
    
                    bulkUpdates.push({
                        updateOne: {
                            filter: { _id: buyProduct._id },
                            update: { $inc: { sold: soldNow } }
                        }
                    });
    
                    totalCost += soldNow * buyProduct.price;
                    totalSold += soldNow;
                    remainingAmount -= soldNow;
                }
    
                if (bulkUpdates.length) await BuyProduct.bulkWrite(bulkUpdates);
    
                const updatedBuyProducts = await BuyProduct.find({
                    product: foundProduct._id,
                    $expr: { $lte: ["$sold", "$amount"] }
                });
    
                let totalValue = 0;
                let totalQuantity = 0;
    
                for (const buyProduct of updatedBuyProducts) {
                    let remainingAmount = buyProduct.amount - buyProduct.sold;
                    totalValue += remainingAmount * buyProduct.price;
                    totalQuantity += remainingAmount;
                }
    
                const averageBuyPriceLeft = totalQuantity > 0 ? totalValue / totalQuantity : 0;
    
                await Product.findByIdAndUpdate(
                    foundProduct._id,
                    {
                        averageBuyPriceLeft,
                        $inc: { amountSold: saleProduct.amount, currentlyAvaliable: -saleProduct.amount },
                    },
                    { new: true }
                );
            }
    
            sale.status = "Approved";
            await sale.save();
    
            return res.status(200).json(sale);
        } catch (error) {
            next(error);
        }
    }
    


}

export default new saleController()