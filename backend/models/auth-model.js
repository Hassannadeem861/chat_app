import mongoose from "mongoose";

const authSchema = new mongoose.Schema(

    {

        name: { type: String, required: true, trim: true, toLowerCase: true },
        email: { type: String, required: true, unique: true, trim: true, toLowerCase: true },
        password: { type: String, required: true, select: false },
        profilePicture: { type: String, default: "" },
        gender: {
            type: String,
            enum: ["male", "female"],
        }


    },

    { timestamps: true }
);
export const Auth = mongoose.model("User", authSchema);
