import { combineReducers } from "redux";

import {
  allRoomsReducer,
  roomDetailsReducer,
  newRoomReducer,
  roomReducer,
} from "./roomReducers";

import { allUsersReducer } from "./userReducers";

import {
  checkBookingReducer,
  bookedDatesReducer,
  bookingsReducer,
  bookingDetailsReducer,
  bookingReducer,
} from "./bookingReducers";

import {
  authSlice,
  forgotPasswordSlice,
  myUserSlice,
  userDetailsSlice,
  userSlice,
} from "../slices/userSlices";

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  newRoom: newRoomReducer,
  roomDetails: roomDetailsReducer,
  room: roomReducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  loadedUser: myUserSlice.reducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsSlice.reducer,
  forgotPassword: forgotPasswordSlice.reducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  booking: bookingReducer,
  bookingDetails: bookingDetailsReducer,
});

export default reducer;
