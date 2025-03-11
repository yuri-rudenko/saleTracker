import { validationResult } from "express-validator";
import { User } from "../models/models.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateJWT = (_id, username) => {

    return jwt.sign(
        { _id, username },
        process.env.SECRET_KEY,
        { expiresIn: '14d' },
    );

};

class authController {

    async login(req, res, next) {

        try {

            const { username, password } = req.body;

            const user = await User.findOne({ username });

            if (!user) {
                return res.status(400).json({ message: "User with that username wasn't found" });
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({ message: "Password is wrong" });
            }

            const userData = { ...user._doc };
            delete userData.password;

            const token = generateJWT(user._id, user.username);

            return res.json({ user: userData, token });

        } catch (error) {
            next(error)
        }

    }

    async register(req, res, next) {

        try {

            const { username, password } = req.body;

            if(username.length < 3) return res.status(400).json({ message: "Username must be longer than 3" });
            if(password.length < 3) return res.status(400).json({ message: "Password must be longer than 3" });

            const candidate = await User.findOne({ username });

            if (candidate) {
                return res.status(400).json({ message: "User with that username already exists" });
            }

            const hashPassword = bcrypt.hashSync(password, 8);

            const user = await User.create({
                username,
                password: hashPassword
            })

            const userData = { ...user._doc };
            delete userData.password;

            if (!user) {
                return res.status(500).json({ message: "User was not registrated." });
            }

            res.status(200).json({ user: userData, token: generateJWT(user._id, user.username) });


        }
        catch (error) {
            next(error)
        }

    }

    async getAll(req, res, next) {

        try {

            const users = await User.find();

            if (!users) {
                return res.status(500).json({ message: "Users were not found." });
            }

            return res.status(200).json({ users })

        } catch (error) {
            next(error)
        }

    }

    async check(req, res, next) {

        try {

            const token = generateJWT(req.user._id, req.user.username);
            return res.json({ token });

        } catch (error) {
            next(error)
        }

    }

}

export default new authController()