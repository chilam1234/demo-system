import { combineReducers } from "redux";

import {
  adminAllUsersSlice,
  authSlice,
  forgotPasswordSlice,
  myUserSlice,
  userDetailsSlice,
  userSlice,
} from "../slices/userSlices";
import {
  checkBookingReducer,
  bookedDatesReducer,
  bookingsReducer,
  bookingDetailsReducer,
  bookingReducer,
} from "./bookingReducers";
import {
  allRoomsReducer,
  roomDetailsReducer,
  newRoomReducer,
  roomReducer,
} from "./roomReducers";

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  newRoom: newRoomReducer,
  roomDetails: roomDetailsReducer,
  room: roomReducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  loadedUser: myUserSlice.reducer,
  allUsers: adminAllUsersSlice.reducer,
  userDetails: userDetailsSlice.reducer,
  forgotPassword: forgotPasswordSlice.reducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  booking: bookingReducer,
  bookingDetails: bookingDetailsReducer,
});

export default reducer;
