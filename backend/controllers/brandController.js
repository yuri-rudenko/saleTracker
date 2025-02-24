import { Brand, Product } from "../models/models.js";

class brandController {

    async getAll(req, res, next) {

        try {

            const { name } = req.query;

            const query = {};
            if (name) {
                query.name = { $regex: name, $options: "i" };
            }

            const brands = await Brand.find(query).populate("products");

            if (!brands) {
                return res.status(404).json({ message: "Brands not found." });
            }

            res.status(200).json(brands);

        } catch (error) {
            next(error);
        }
    }

    async get(req, res, next) {

        try {

            const { _id } = req.params;

            const brand = await Brand.findById(_id).populate("products")

            if (!brand) {
                return res.status(404).json({ message: "Brand not found." });
            }

            res.status(200).json(brand);

        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const { name, product } = req.body;

            if (!name) return res.status(400).json({ message: "Brand must have a name." });

            let foundProduct = null;
            if (product) {
                foundProduct = await Product.findById(product._id);
                if (!foundProduct) return res.status(404).json({ message: "Product not found." });
            }

            const brand = await Brand.create({
                name,
                products: foundProduct ? [foundProduct._id] : []
            });

            res.status(200).json(brand);

        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {

        try {

            const { _id } = req.params;

            const brand = await Brand.findByIdAndDelete(_id)

            if (!brand) {
                return res.status(404).json({ message: "Brand not found." });
            }

            res.status(200).json(brand);

        } catch (error) {
            next(error);
        }

    }

    async edit(req, res, next) {

        try {

            const { _id, ...fieldsToUpdate } = req.body;

            const editedBrand = await Brand.findByIdAndUpdate(
                _id,
                fieldsToUpdate,
                { new: true }
            )

            if (!editedBrand) {
                return res.status(404).json({ message: "Brand not found." });
            }

            res.status(200).json(editedBrand);

        } catch (error) {
            next(error);
        }

    }

    async addProduct(req, res, next) {
        try {

            const { brandId, productId } = req.body;

            if (!brandId || !productId) return res.status(400).json({ message: "Request must have brand and product." });

            const brand = await Brand.findByIdAndUpdate(brandId,
                { $push: { products: productId } },
                { new: true }
            )

            if (!brand) return res.status(404).json({ message: "Brand not found." });

            res.status(200).json(brand);

        } catch (error) {
            next(error);
        }
    }

    async removeProduct(req, res, next) {
        try {

            const { brandId, productId } = req.body;

            if (!brandId || !productId) return res.status(400).json({ message: "Request must have brand and product." });

            const brand = await Brand.findByIdAndUpdate(
                brandId,
                { $pull: { products: productId } },
                { new: true }
            );

            if (!brand) {
                return res.status(404).json({ message: "Brand not found." });
            }

            res.status(200).json(brand);

        } catch (error) {
            next(error);
        }
    }

}

export default new brandController()
