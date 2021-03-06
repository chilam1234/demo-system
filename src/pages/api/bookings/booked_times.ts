import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { checkBookedRoomTimes } from "../../../server/controllers/bookingControllers";
import dbConnect from "../../../server/lib/dbConnect";
import onError from "../../../server/middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

/**
 * @swagger
 * /api/bookings/booked_times:
 *   get:
 *     description: get booked room times by room id
 *     responses:
 *       200:
 *         description: success
 *     tags:
 *       - Booking
 */
handler.get(checkBookedRoomTimes);

export default handler;
