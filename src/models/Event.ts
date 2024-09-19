import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { Event } from "@/types";

const EventSchema = new mongoose.Schema<Event>({
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
  logoUrl: {
    type: String,
    required: true,
    message: "Logo URL is a required field"
  },
  date:  { 
    type: String,
    default: () => new Date().toISOString(),
    required: true,
    match: [/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/, 'Enter a valid date in ISO string format'],
  },
  sessionIds: {
    type: [String],
    default: [],
    required: true,
  },
});

export default mongoose.models.Event || mongoose.model<Event>("Event", EventSchema);