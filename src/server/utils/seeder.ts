import mongoose from "mongoose";

import rooms from "../../../data/rooms.json";
import Room from "../models/room";

mongoose.connect(
  "mongodb://root:example@localhost:27017?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const seedRooms = async () => {
  try {
    await Room.deleteMany();

    await Room.insertMany(rooms);

    process.exit();
  } catch (error) {
    process.exit();
  }
};

seedRooms();
