import bcrypt from "bcrypt";
import * as authUser from "../models/User.js";

export const registerUser = async (req, res, next) => {
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
            res.json({
                email: user.email,
                id: user._id,
            });
        } else {
            const err = new Error("Login not possible!");
            err.statusCode = 400;
            throw err;
        }
    } catch (err) {
        return next(err);
    }
};
