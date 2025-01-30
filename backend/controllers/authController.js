import { validationResult } from "express-validator";
import { User } from "../models/models.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateJWT = (id) => {
    const payload = {
        id,
    }

    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "7d"})

}

class authController {

    async login(req, res, next) {

        try {

            const {username, password} = req.body;
            const user = await User.findOne({username});

            if(!user) {
                return res.status(400).json({message: "User with that username wasn't found"});
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if(!validPassword) {
                return res.status(400).json({message: "Password is wrong"});
            }

            const token = generateJWT(user._id);

            return res.json({token});
            
        } catch (error) {
            next(error)
        } 

    }

    async register(req, res, next) {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({message: "Registration errors", errors});
        }

        const {username, password} = req.body;

        const candidate = await User.findOne({username});

        if(candidate) {
            return res.status(400).json({message: "User with that username already exists"});
        }

        const hashPassword = bcrypt.hashSync(password, 8);

        const user = User.create({
            username,
            password: hashPassword
        })

        if (!user) {
            return res.status(500).json({ message: "User was not registrated." });
        }
        
        res.status(200).json({message: `User ${username} has been succesfully registrated.`});


        try {
            
        } catch (error) {
            next(error)
        } 

    }

    async getAll(req, res, next) {

        try {

            const users = await User.find();

            if (!users) {
                return res.status(500).json({ message: "Users were not found." });
            }

            return res.status(200).json({users})
            
        } catch (error) {
            next(error)
        } 

    }

}

export default new authController()