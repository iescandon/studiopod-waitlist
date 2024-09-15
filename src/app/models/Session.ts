import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface Session extends mongoose.Document {
    _id: string;
    eventId: string;
    userId: string;
    status: string;
    checkInTime?: Date;
    skippedTime?: Date;
    entryTime?: Date;
    exitTime?: Date;
}

const SessionSchema = new mongoose.Schema<Session>({
    _id: {
        type: String,
        default: uuidv4,
        required: true,
    },
    eventId: { 
        type: String,
        required: true,
        message: "Event Id is a required field"

    },
    userId: { 
        type: String,
        required: true,
        message: "User Id is a required field"

    },
    status: {
        type: String,
        enum: ['waiting', 'skipped', 'completed', "in_studio"],
        default: 'waiting',
        required: true
    },
    checkInTime: {
        type: Date,
        default: Date.now,
        required: true,
    },
    skippedTime: {
        type: Date,
    },
    entryTime: { 
        type: Date,
    },
    exitTime: {
        type: Date,
    },
});

export default mongoose.models.Session || mongoose.model<Session>("Session", SessionSchema);