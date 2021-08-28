import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import RoomFeatures from "./RoomFeatures";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Carousel } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/roomActions";

import {
  checkBooking,
  createBooking,
  getBookedDates,
} from "../../redux/actions/bookingActions";
import { CHECK_BOOKING_RESET } from "../../redux/constants/bookingConstants";

import { RootState } from "../../redux/store";
import BookingCalendar from "../booking/BookingCalendar";

const RoomDetails = () => {
  const [startDateTime, setStartDateTime] = useState<Date>();
  const [endDateTime, setEndDateTime] = useState<Date>();

  const dispatch = useDispatch();
  const router = useRouter();

  const { dates } = useSelector<RootState>((state) => state.bookedDates);
  const { user } = useSelector<RootState>((state) => state.loadedUser);
  const { room, error } = useSelector<RootState>((state) => state.roomDetails);
  const { error: createBookingError } = useSelector<RootState>(
    (state) => state.booking
  );
  const { available, loading: bookingLoading } = useSelector<RootState>(
    (state) => state.checkBooking
  );

  const excludedDates = [];
  dates.forEach((date) => {
    excludedDates.push(new Date(date));
  });

  const onChange = (dates: [Date, Date]) => {
    const [startDateTime, endDateTime] = dates;

    setStartDateTime(startDateTime);
    setEndDateTime(endDateTime);

    if (startDateTime && endDateTime) {
      dispatch(
        checkBooking(id, startDateTime.toISOString(), endDateTime.toISOString())
      );
    }
  };

  const { id } = router.query;

  const bookRoom = async (id) => {
    const bookingData = {
      room: id,
      startDateTime,
      endDateTime,
    };

    dispatch(createBooking(bookingData));
    if (createBookingError) {
      toast.error(createBookingError);
      dispatch(clearErrors());
    }
    toast.info("successfully booked");
    router.push("../bookings/me");
  };

  useEffect(() => {
    dispatch(getBookedDates(id));

    toast.error(error);
    dispatch(clearErrors());

    return () => {
      dispatch({ type: CHECK_BOOKING_RESET });
    };
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{room.name}</title>
      </Head>

      <div className="container container-fluid">
        <h2 className="mt-5">{room.name}</h2>
        <p>{room.address}</p>

        <Carousel pause="hover">
          {room.images &&
            room.images.map((image) => (
              <Carousel.Item key={image.public_id}>
                <div style={{ width: "100%", height: "440px" }}>
                  <Image
                    className="d-block m-auto"
                    src={image.url}
                    alt={room.name}
                    layout="fill"
                  />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>

        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>{room.description}</p>

            <RoomFeatures room={room} />
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="booking-card shadow-lg p-4">
              <h3 className="mb-3">Select the time slot</h3>
              <DatePicker
                className="w-100"
                selected={startDateTime}
                onChange={onChange}
                startDate={startDateTime}
                endDate={endDateTime}
                minDate={new Date()}
                excludeDates={excludedDates}
                showTimeSelect
                timeIntervals={60}
              />
              <BookingCalendar />

              {available === true && (
                <div className="alert alert-success my-3 font-weight-bold">
                  Room is available. Book now.
                </div>
              )}

              {available === false && (
                <div className="alert alert-danger my-3 font-weight-bold">
                  Room not available. Try different dates.
                </div>
              )}

              {available && !user && (
                <div className="alert alert-danger my-3 font-weight-bold">
                  Login to book room.
                </div>
              )}

              {available && user && (
                <button
                  className="btn btn-block py-3 booking-btn"
                  onClick={() => bookRoom(room._id)}
                  disabled={bookingLoading ? true : false}
                >
                  Book it now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
