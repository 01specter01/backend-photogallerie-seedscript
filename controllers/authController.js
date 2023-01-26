import { bcrypt } from "bcrypt";
import * as User from "../models/User.js";

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
export const registerUser = async(req, res, next) => {
try{
    const result = await User.create(req.body.email)
} catch {

}
}
