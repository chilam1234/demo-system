import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { checkRoomBookingAvailability } from "../../../../controllers/bookingControllers";
import dbConnect from "../../../../lib/dbConnect";
import { isAuthenticatedUser } from "../../../../middlewares/auth";
import onError from "../../../../middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

/**
 * @swagger
 * /api/bookings/check:
 *   get:
 *     description: check room availability by room id
 *     responses:
 *       200:
 *         description: success
 *     tags:
 *       - Booking
 */
handler.use(isAuthenticatedUser).get(checkRoomBookingAvailability);

export default handler;
