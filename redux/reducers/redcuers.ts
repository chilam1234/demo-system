import { combineReducers } from "redux";

import {
  allRoomsReducer,
  roomDetailsReducer,
  newReviewReducer,
  checkReviewReducer,
  newRoomReducer,
  roomReducer,
  roomReviewsReducer,
  reviewReducer,
} from "./roomReducers";

import {
  userReducer,
  loadedUserReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./userReducers";

import {
  checkBookingReducer,
  bookedDatesReducer,
  bookingsReducer,
  bookingDetailsReducer,
  bookingReducer,
} from "./bookingReducers";

import { authSlice, myUserSlice, userSlice } from "../slices/userSlices";

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  newRoom: newRoomReducer,
  roomDetails: roomDetailsReducer,
  room: roomReducer,
  auth: authSlice.reducer,
  //user: userReducer,
  user: userSlice.reducer,
  loadedUser: myUserSlice.reducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  booking: bookingReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducer,
  checkReview: checkReviewReducer,
  roomReviews: roomReviewsReducer,
  review: reviewReducer,
});

export default reducer;
