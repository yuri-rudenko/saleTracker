import { Type } from "../models/models.js";

class typeController {

    async getAll(req, res, next) {

        try {

            const { name } = req.query;

            const query = {};
            if (name) {
                query.name = { $regex: name, $options: "i" };
            }

            const types = await Type.find(query).populate("products");

            if (!types) {
                return res.status(404).json({ message: "Types not found." });
            }
            
            res.status(200).json(types);
            
        } catch (error) {
            next(error);
        }
    }

    async get(req, res, next) {

        try {

            const {_id} = req.params;

            const type = await Type.findById(_id).populate("products")

            if (!type) {
                return res.status(404).json({ message: "Type not found." });
            }
            
            res.status(200).json(type);
            
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {

        try {

            const {name} = req.body;

            if(!name) return res.status(400).json({ message: "Type must have a name." });

            const type = await Type.create({
                name
            })

            res.status(200).json(type);
            
        } catch (error) {
            next(error);
        }

    }

    async delete(req, res, next) {

        try {

            const {_id} = req.params;

            const type = await Type.findByIdAndDelete(_id)

            if (!type) {
                return res.status(404).json({ message: "Type not found." });
            }

            res.status(200).json(type);
            
        } catch (error) {
            next(error);
        }

    }

    async edit(req, res, next) {

        try {

            const {_id, ...fieldsToUpdate} = req.body;

            const editedType = await Type.findByIdAndUpdate(
                _id,
                fieldsToUpdate,
                { new: true }
            )

            if (!editedType) {
                return res.status(404).json({ message: "Type not found." });
            }

            res.status(200).json(editedType);
            
        } catch (error) {
            next(error);
        }

    }

    async addProduct(req, res, next) {
        try {

            const {typeId, productId} = req.body;

            if(!typeId || !productId) return res.status(400).json({ message: "Request must have brand and product." });
            
            const type = await Type.findByIdAndUpdate(typeId, 
                {$push: {products: productId} },
                {new: true}
            )

            if(!type) return res.status(404).json({ message: "Type not found." });

            res.status(200).json(type);

        } catch (error) {
            next(error);
        }
    }

    async removeProduct(req, res, next) {
        try {
    
            const { typeId, productId } = req.body;

            if(!typeId || !productId) return res.status(400).json({ message: "Request must have brand and product." });
    
            const type = await Type.findByIdAndUpdate(
                typeId,
                { $pull: { products: productId } }, 
                { new: true } 
            );
    
            if (!type) {
                return res.status(404).json({ message: "Type not found." });
            }
    
            res.status(200).json(type);
    
        } catch (error) {
            next(error);
        }
    }

}

export default new typeController()
