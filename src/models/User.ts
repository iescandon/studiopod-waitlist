import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { User } from "@/types";

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
        match: [/^[1-9]\d{1,14}$/, 'Enter a valid phone number'],
        // match: [/^\+?[1-9]\d{1,14}$/, 'Enter a valid phone number'],
        message: "Phone is a required field"
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email address'],

    }
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);