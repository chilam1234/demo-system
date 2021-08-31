import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { myBookings } from "../../../server/controllers/bookingControllers";
import dbConnect from "../../../server/lib/dbConnect";
import { isAuthenticatedUser } from "../../../server/middlewares/auth";
import onError from "../../../server/middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

/**
 * @swagger
 * /api/bookings/me:
 *   get:
 *     description: get all current user bookings
 *     responses:
 *       200:
 *         description: success
 *     tags:
 *       - Booking
 */
handler.use(isAuthenticatedUser).get(myBookings);

export default handler;
