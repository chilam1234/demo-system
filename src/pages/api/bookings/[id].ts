import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import {
  deleteBooking,
  getBookingDetails,
} from "../../../server/controllers/bookingControllers";
import dbConnect from "../../../server/lib/dbConnect";
import { isAuthenticatedUser } from "../../../server/middlewares/auth";
import onError from "../../../server/middlewares/errors";

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
