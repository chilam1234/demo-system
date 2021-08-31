import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { clearErrors } from "../../../redux/actions/bookingActions";

const BookingDetails = () => {
  const dispatch = useDispatch();

  const { booking, error } = useSelector((state) => state.bookingDetails);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, booking, error]);

  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 booking-details">
          {booking && booking.room && booking.user && (
            <>
              <h2 className="my-5">Booking # {booking._id}</h2>

              <h4 className="mb-4">User Info</h4>
              <p>
                <b>Name:</b> {booking.user && booking.user.name}
              </p>
              <p>
                <b>Email:</b> {booking.user && booking.user.email}
              </p>

              <hr />

              <h4 className="mb-4">Booking Info</h4>
              <p>
                <b>Check In:</b>{" "}
                {new Date(booking.startDateTime).toLocaleString("en-US")}
              </p>

              <p>
                <b>Check Out:</b>{" "}
                {new Date(booking.endDateTime).toLocaleString("en-US")}
              </p>

              <hr />

              <h4 className="mt-5 mb-4">Booked Room:</h4>

              <hr />
              <div className="cart-item my-1">
                <div className="row my-5">
                  <div className="col-4 col-lg-2">
                    <Image
                      src={booking.room?.images[0]?.url ?? ""}
                      alt={booking.room.name}
                      height={45}
                      width={65}
                    />
                  </div>

                  <div className="col-5 col-lg-5">
                    <Link href={`/room/${booking.room._id}`}>
                      {booking.room.name}
                    </Link>
                  </div>
                </div>
              </div>
              <hr />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
