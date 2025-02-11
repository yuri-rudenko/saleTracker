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
            const { _id, views, date } = req.body;
            if (!_id) return res.status(400).json({ message: "Product ID is required." });

            const product = await Product.findById(_id);
            if (!product) return res.status(404).json({ message: "Product not found." });

            const newDate = new Date(date);
            newDate.setHours(0, 0, 0, 0);

            const futureEntry = product.views.some(entry => new Date(entry.date) > newDate);
            if (futureEntry) {
                return res.status(400).json({ message: "Cannot modify views when future data exists." });
            }

            let lastEntry = product.views
                .filter(entry => new Date(entry.date) < newDate)
                .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

            let lastViews = lastEntry ? lastEntry.views : 0;

            let currentDate = lastEntry ? new Date(lastEntry.date) : new Date(newDate);
            currentDate.setDate(currentDate.getDate() + 1);

            while (currentDate < newDate) {
                product.views.push({ date: new Date(currentDate), views: lastViews });
                currentDate.setDate(currentDate.getDate() + 1);
            }

            const existingEntry = product.views.find(entry => new Date(entry.date).getTime() === newDate.getTime());
            if (existingEntry) {
                existingEntry.views = views;
            } else {
                product.views.push({ date: new Date(newDate), views });
            }

            await product.save();

            res.status(200).json({ message: "Views updated successfully", views: product.views });

        } catch (error) {

            next(error);

        }
    };

}

export default new productController()
