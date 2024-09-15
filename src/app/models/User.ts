import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface User extends mongoose.Document {
    _id: string;
    name: string;
    phone: string;
    email: string;
}

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
        match: [/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 'Enter a valid phone number'],
        // validate: {
        //     validator: function(v: string) {
        //         if(v.length === 10) return true;
        //         return /\d{10}/.test(v);
        //     },
        //     message: "Please enter a valid phone number"
        // },
        message: "Phone is a required field"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email address'],
        // validate: {
        //     validator: function(v: string) {
        //         return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        //     },
        //     message: "Please enter a valid email"
        // },
        message: "Email is a required field"

    }
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);