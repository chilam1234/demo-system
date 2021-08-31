import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { newBooking } from "../../../controllers/bookingControllers";
import dbConnect from "../../../lib/dbConnect";
import { isAuthenticatedUser } from "../../../middlewares/auth";
import onError from "../../../middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     description: create a new booking
 *     responses:
 *       201:
 *         description: success
 *     tags:
 *       - Booking
 */
handler.use(isAuthenticatedUser).post(newBooking);

export default handler;
