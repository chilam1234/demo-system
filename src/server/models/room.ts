import { model, models, Schema, Document, Model } from "mongoose";

interface Room extends Document {
  name: string;
  description: string;
  address: string;
  guestCapacity: number;
  category: string;
  user?: any;
  images: {
    public_id: string;
    url: string;
  }[];
  createdAt?: Date;
}
const roomSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter room name"],
    trim: true,
    maxLength: [100, "Room name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter room description"],
  },
  address: {
    type: String,
    required: [true, "Please enter room address"],
  },
  guestCapacity: {
    type: Number,
    required: [true, "Please enter room guest capacity"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter room category"],
    enum: {
      values: ["Cola", "Pepsi"],
      message: "Please select correct company type for room",
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const output =
  (models.Room as Model<Room, {}>) || model<Room>("Room", roomSchema);

export default output;
