import { Brand, Product, Type } from "../models/models.js";

class productController {

    async get(req, res, next) {

        try {

            const { _id } = req.params;

            const product = await Product.findById(_id).populate({
                path: 'sales',
                populate: {
                    path: 'action'
                },
                select: 'price date amount type link'
            })
                .populate("brand")
                .populate("type");

            res.status(200).json(product);

        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {

        try {

            const { name } = req.query;

            const query = {};
            if (name) {
                query.name = { $regex: name, $options: "i" };
            }

            const products = await Product.find(query).populate("brand").populate("type")

            res.status(200).json(products)

        } catch (error) {
            next(error);
        }

    }

    async create(req, res, next) {

        try {

            const { name, type, brand, image, link, views } = req.body;

            const newViews = (views === "" || views === null || views === undefined) ? 0 : views;

            if (!name || !image || !link || !type || !brand) {
                return res.status(400).json({ message: "Some of the parameters are missing" });
            }

            const finalBrand = await Brand.findOneAndUpdate(
                { name: brand },
                { name: brand },
                { new: true, upsert: true }
            );

            const finalType = await Type.findOneAndUpdate(
                { name: type },
                { name: type },
                { new: true, upsert: true }
            );

            if (!finalBrand || !finalType) {
                return res.status(404).json({ message: "Type or brand not found." });
            }

            const product = await Product.create({
                name,
                type: finalType._id,
                brand: finalBrand._id,
                image,
                link,
                views: [{ date: new Date(), views: newViews }],
            })

            const populatedProduct = await Product.findById(product._id)
                .populate("brand")
                .populate("type");

            res.status(200).json(populatedProduct);

        } catch (error) {
            next(error);
        }

    }

    async delete(req, res, next) {

        try {

            const { _id } = req.params;

            if (!_id) return res.status(400).json({ message: "Product ID is required." });

            const deletedProduct = await Product.findByIdAndDelete(_id);

            res.status(200).json(deletedProduct);

        } catch (error) {
            next(error);
        }

    }

    async edit(req, res, next) {

        try {

            const { _id, ...fieldsToUpdate } = req.body;

            if (!_id) return res.status(400).json({ message: "Product ID is required." });

            const editedProduct = await Product.findByIdAndUpdate(
                _id,
                fieldsToUpdate,
                { new: true }
            )

            if (!editedProduct) {
                return res.status(404).json({ message: "Product not found." });
            }

            res.status(200).json(editedProduct);

        } catch (error) {

            next(error);

        }

    }

    async editViews(req, res, next) {
        
        try {

            const products = req.body; // [{ _id, newViews }]

            if (!Array.isArray(products) || products.length === 0) {
                return res.status(400).json({ message: "Products array is required." });
            }

            const updatedProducts = [];
            const newDate = new Date(Date.now());
            newDate.setHours(0, 0, 0, 0);

            for (const { _id, views } of products) {
                if (!_id) {
                    return res.status(400).json({ message: "Each product must have an id." });
                }

                const product = await Product.findById(_id);
                if (!product) {
                    return res.status(404).json({ message: `Product with ID ${_id} not found.` });
                }

                const futureEntry = product.views.some(entry => new Date(entry.date) > newDate);
                if (futureEntry) {
                    return res.status(400).json({ message: `Cannot modify views for product ${_id} when future data exists.` });
                }

                product.views.push({ date: newDate, views });

                await product.save();
                updatedProducts.push({ _id: product._id, views: product.views });
            }   

            res.status(200).json(updatedProducts);

        } catch (error) {
            next(error);
        }
    }


}

export default new productController()
