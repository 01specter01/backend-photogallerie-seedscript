import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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

const User = mongoose.model("User", userSchema);

