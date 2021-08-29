import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect";

import {
  deleteBooking,
  getBookingDetails,
} from "../../../controllers/bookingControllers";

import { isAuthenticatedUser } from "../../../middlewares/auth";
import onError from "../../../middlewares/errors";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

/**
 * @swagger
 * /api/bookings/:id:
 *   get:
 *     description: get booking details
 *     responses:
 *       200:
 *         description: success
 *     tags:
 *       - Booking
 */
handler.use(isAuthenticatedUser).get(getBookingDetails);

/**
 * @swagger
 * /api/bookings/:id:
 *   delete:
 *     description: delete user booking
 *     responses:
 *       200:
 *         description: success
 *     tags:
 *       - Booking
 */
handler.use(isAuthenticatedUser).delete(deleteBooking);

export default handler;
