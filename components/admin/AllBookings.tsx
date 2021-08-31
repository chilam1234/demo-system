import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { MDBDataTable } from "mdbreact";

import Loader from "../layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  getAdminBookings,
  deleteBookingByAdmin,
  clearErrors,
} from "../../redux/actions/bookingActions";
import { DELETE_BOOKING_RESET } from "../../redux/constants/bookingConstants";
import { RootState } from "../../redux/store";

const AllBookings = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { bookings, error, loading } = useSelector<RootState>(
    (state) => state.bookings
  );
  const { isDeleted, error: deleteError } = useSelector(
    (state: RootState) => state.booking
  );

  useEffect(() => {
    dispatch(getAdminBookings());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      router.push("/admin/bookings");
      dispatch({ type: DELETE_BOOKING_RESET });
    }
  }, [dispatch, deleteError, isDeleted, error, router]);

  const setBookings = () => {
    const data = {
      columns: [
        {
          label: "Booking ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "start",
          field: "startDateTime",
          sort: "asc",
        },
        {
          label: "end",
          field: "endDateTime",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    bookings &&
      bookings.forEach((booking) => {
        data.rows.push({
          id: booking._id,
          name: booking.room.name,
          startDateTime: new Date(booking.startDateTime).toLocaleString(
            "en-US"
          ),
          endDateTime: new Date(booking.endDateTime).toLocaleString("en-US"),
          actions: (
            <>
              <Link href={`/admin/bookings/${booking._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-eye"></i>
                </a>
              </Link>

              <button
                className="btn btn-danger mx-2"
                onClick={() => deleteBookingHandler(booking._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  const deleteBookingHandler = (id) => {
    dispatch(deleteBookingByAdmin(id));
  };

  return (
    <div className="container container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="my-5">{`${bookings && bookings.length} Bookings`}</h1>

          <MDBDataTable
            data={setBookings()}
            className="px-3"
            bordered
            striped
            hover
          />
        </>
      )}
    </div>
  );
};

export default AllBookings;
