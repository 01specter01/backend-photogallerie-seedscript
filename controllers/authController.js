import bcrypt from "bcrypt";
import * as authUser from "../models/User.js";

const errorSwitch = (err) => {
    switch (err.path) {
        case "_id":
            err.statusCode = 404;
            err.message = "ID not found";
            break;
        default:
            err.statusCode = 400;
            err.message = "Check input";
    }
    return err;
};
export const registerUser = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    try {
        const newUser = await authUser.create({
            email: req.body.email,
            password: req.body.hashedPassword,
        })

        res.status(201).json({
            email: newUser.email,
            password: newUser.authUser
        })
    } catch {}
};
