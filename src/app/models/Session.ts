import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface Session extends mongoose.Document {
    _id: string;
    eventId: string;
    userId: string;
    status: string;
    checkInTime?: string;
    skippedTime?: string;
    entryTime?: string;
    exitTime?: string;
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
        type: String,
        default: () => new Date().toISOString(),
        required: true,
        match: [/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/, 'Enter a valid date in ISO string format'],
    },
    skippedTime: {
        type: String,
        match: [/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/, 'Enter a valid date in ISO string format'],
    },
    entryTime: { 
        type: String,
        match: [/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/, 'Enter a valid date in ISO string format'],
    },
    exitTime: {
        type: String,
        match: [/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/, 'Enter a valid date in ISO string format'],
    },
});

export default mongoose.models.Session || mongoose.model<Session>("Session", SessionSchema);