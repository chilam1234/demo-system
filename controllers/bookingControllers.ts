import Booking from "../models/booking";

import ErrorHandler from "../utils/errorHandler";
import * as Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

// Create new Booking   =>   /api/bookings
const newBooking = async (req, res) => {
  const { room, startDateTime, endDateTime, amountPaid, paymentInfo } =
    req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    startDateTime,
    endDateTime,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });

  res.status(200).json({
    success: true,
    booking,
  });
};

// Create new booking   =>   /api/bookings/check
const checkRoomBookingAvailability = async (req, res) => {
  let { roomId, startDateTime, endDateTime } = req.query;

  startDateTime = new Date(startDateTime);
  endDateTime = new Date(endDateTime);

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      {
        startDateTime: {
          $lte: endDateTime,
        },
      },
      {
        endDateTime: {
          $gte: startDateTime,
        },
      },
    ],
  });

  // Check if there is any booking available
  let isAvailable;

  if (bookings && bookings.length === 0) {
    isAvailable = true;
  } else {
    isAvailable = false;
  }

  res.status(200).json({
    success: true,
    isAvailable,
  });
};

// Check booked dates of a room   =>   /api/bookings/check_booked_dates
const checkBookedDatesOfRoom = async (req, res) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ room: roomId });

  let bookedDates = [];

  const timeDiffernece = moment().utcOffset() / 60;

  bookings.forEach((booking) => {
    const startDateTime = moment(booking.startDateTime).add(
      timeDiffernece,
      "hours"
    );
    const endDateTime = moment(booking.endDateTime).add(
      timeDiffernece,
      "hours"
    );

    const range = moment.range(moment(startDateTime), moment(endDateTime));

    const dates = Array.from(range.by("day"));
    bookedDates = bookedDates.concat(dates);
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
  console.log("user", req.user);
  const booking = await Booking.findById(req.query.id);
  console.log("booking user", booking.user);

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
  checkBookedDatesOfRoom,
  myBookings,
  getBookingDetails,
  allAdminBookings,
  deleteBookingByAdmin,
  deleteBooking,
};
