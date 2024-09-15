import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface Event extends mongoose.Document {
  _id: string;
  name: string;
  date: Date;
  sessionIds: string | undefined[];
}

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
  date:  { 
    type: Date,
    default: Date.now,
    required: true,
  },
  sessionIds: {
    type: [String],
    default: [],
    required: true,
  },
});

export default mongoose.models.Event || mongoose.model<Event>("Event", EventSchema);