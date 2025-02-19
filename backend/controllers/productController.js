import { Product } from "../models/models.js";

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
                .populate("category");

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

            const products = await Product.find(query).populate("brand").populate("category")

            res.status(200).json(products)

        } catch (error) {
            next(error);
        }

    }

    async create(req, res, next) {

        try {

            const { name, category, brand, image, link, views = 0 } = req.body;

            if (!brand || !brand._id || !category || !category._id) {
                return res.status(404).json({ message: "Category or brand not found." });
            }

            const product = await Product.create({
                name,
                category: category._id,
                brand: brand._id,
                image,
                link,
                views
            })

            res.status(200).json({ product: product });

        } catch (error) {
            next(error);
        }

    }

    async delete(req, res, next) {

        try {

            const { _id } = req.params;

            if (!_id) return res.status(400).json({ message: "Product ID is required." });

            const deletedProduct = await Product.findByIdAndDelete(_id);

            res.status(200).json({ product: deletedProduct });

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
            const products = req.body; // [{ _id, views, date }]

            if (!Array.isArray(products) || products.length === 0) {
                return res.status(400).json({ message: "Products array is required." });
            }

            const updatedProducts = [];

            for (const { _id, views, date } of products) {
                if (!_id) {
                    return res.status(400).json({ message: "Each product must have an id." });
                }

                const product = await Product.findById(_id);
                if (!product) {
                    return res.status(404).json({ message: `Product with ID ${_id} not found.` });
                }

                const newDate = new Date(date);
                newDate.setHours(0, 0, 0, 0);

                const futureEntry = product.views.some(entry => new Date(entry.date) > newDate);
                if (futureEntry) {
                    return res.status(400).json({ message: `Cannot modify views for product ${_id} when future data exists.` });
                }

                product.views.push({ date: newDate, views });

                await product.save();
                updatedProducts.push({ _id: product._id, views: product.views });
            }

            res.status(200).json({ products: updatedProducts });

        } catch (error) {
            next(error);
        }
    }


}

export default new productController()
