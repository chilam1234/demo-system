import moment from "moment";

import Booking from "../models/booking";
import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";

const newBooking = async (req, res) => {
  const { room, startDateTime, endDateTime } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    startDateTime: moment.utc(startDateTime).toDate(),
    endDateTime: moment.utc(endDateTime).toDate(),
  });

  res.status(201).json({
    success: true,
    booking,
  });
};

// Create new booking   =>   /api/bookings/check
const checkRoomBookingAvailability = async (req, res) => {
  let { roomId, startDateTime, endDateTime } = req.query;

  startDateTime = moment.utc(startDateTime).toDate();
  endDateTime = moment.utc(endDateTime).toDate();
  const room = await Room.findById(roomId);
  if (!room) {
    throw new ErrorHandler("No such room", 400);
  }

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      {
        startDateTime: {
          $lt: endDateTime,
        },
      },
      {
        endDateTime: {
          $gt: startDateTime,
        },
      },
    ],
  });

  // Check if there is any booking available
  let isAvailable;

  if (bookings && bookings.length === 0 && room.category === req.user.company) {
    isAvailable = true;
  } else {
    isAvailable = false;
  }

  res.status(200).json({
    success: true,
    isAvailable,
  });
};

const checkBookedRoomTimes = async (req, res) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ room: roomId });

  let bookedDates = [];
  bookings.forEach((booking) => {
    const localStartDateTime = moment(booking.startDateTime).toDate();
    const localEndDateTime = moment(booking.endDateTime).toDate();

    bookedDates = bookedDates.concat({
      start: localStartDateTime,
      end: localEndDateTime,
    });
  });

  res.status(200).json({
    success: true,
    bookedDates,
  });
};

// Get all bookings of current user   =>   /api/bookings/me
const myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate({
      path: "room",
      select: "name images",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    success: true,
    bookings,
  });
};

// Get booking details   =>   /api/bookings/:id
const getBookingDetails = async (req, res) => {
  const booking = await Booking.findById(req.query.id)
    .populate({
      path: "room",
      select: "name images",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    success: true,
    booking,
  });
};

// Get all bookings - ADMIN   =>   /api/admin/bookings
const allAdminBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate({
      path: "room",
      select: "name images",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    success: true,
    bookings,
  });
};

const deleteBookingByAdmin = async (req, res, next) => {
  const booking = await Booking.findById(req.query.id);

  if (!booking) {
    return next(new ErrorHandler("Booking not found with this ID", 400));
  }

  await booking.remove();

  res.status(200).json({
    success: true,
  });
};

const deleteBooking = async (req, res, next) => {
  const booking = await Booking.findById(req.query.id);

  if (!booking) {
    return next(new ErrorHandler("Booking not found with this ID", 400));
  }

  await booking.remove();

  res.status(200).json({
    success: true,
  });
};

export {
  newBooking,
  checkRoomBookingAvailability,
  checkBookedRoomTimes,
  myBookings,
  getBookingDetails,
  allAdminBookings,
  deleteBookingByAdmin,
  deleteBooking,
};
