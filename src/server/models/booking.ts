import mongoose, { Document, Model } from "mongoose";

import Room from "./room";
import User from "./user";

interface Booking extends Document {
  room: typeof Room;
  user: typeof User;
  startDateTime: Date;
  endDateTime: Date;
  createdAt: Date;
}
const bookingSchema = new mongoose.Schema<Booking>({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Room",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  startDateTime: {
    type: Date,
    required: true,
  },
  endDateTime: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default (mongoose.models.Booking as Model<Booking, {}>) ||
  mongoose.model<Booking>("Booking", bookingSchema);
