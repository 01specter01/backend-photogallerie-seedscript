import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (v) => {
                    const val = v.includes("@");
                    return val;
                },
                message: "Please give a valid email adress",
            },
        },
        password: {
            type: String,
        },
    },
    {
        versionKey: false,
    }
);

const userModel = model("User", userSchema);

export const create = async (data) => {
    const result = await userModel.create(data);
    return result;
};

export const getOne = async (filter) => {
    const result = await userModel.findOne(filter);
    return result;
};
