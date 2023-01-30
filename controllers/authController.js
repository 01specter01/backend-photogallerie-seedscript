import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import * as authUser from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    try {
        const newUser = await authUser.create({
            email: req.body.email,
            password: hashedPassword,
        });

        res.status(201).json({
            email: newUser.email,
            id: newUser._id,
        });
    } catch (err) {
        err.statusCode = 400;
        return next(err);
    }
};

export const login = async (req, res, next) => {
    function signInToken(payload) {
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRESIN,
            algorithm: "HS512",
        });
        return token;
    }
    try {
        const user = await authUser.getOne({ email: req.body.email });

        if (!user) {
            const err = new Error("Login not possible!");
            err.statusCode = 400;
            throw err;
        }
        const passwordIsCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (passwordIsCorrect) {
            const signToken = signInToken({ email: user.email, id: user._id });
            res.json({
                email: user.email,
                id: user._id,
                signToken,
            });
        } else {
            const err = new Error("Login not possible!");
            err.statusCode = 401;
            throw err;
        }
    } catch (err) {
        return next(err);
    }
};
