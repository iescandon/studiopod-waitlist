import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { User } from "@/app/types";

const UserSchema = new mongoose.Schema<User>({
    _id: {
        type: String,
        default: uuidv4,
        required: true,
    },
    name: {
        type: String,
        required: true,
        message: "Name is a required field"
    },
    phone: { 
        type: String, 
        required: true,
        unique: true,
        match: [/\d{10}/, 'Enter a valid phone number'],
        message: "Phone is a required field"
    },
    email: {
        type: String,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email address'],
        message: "Email is a required field"

    }
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);