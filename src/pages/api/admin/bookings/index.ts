import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { allAdminBookings } from "../../../../server/controllers/bookingControllers";
import dbConnect from "../../../../server/lib/dbConnect";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../server/middlewares/auth";
import onError from "../../../../server/middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

/**
 * @swagger
 * /api/admin/bookings:
 *   get:
 *     description: get All the booking
 *     responses:
 *       200:
 *         description: all bookings
 *     tags:
 *       - Admin
 */
handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminBookings);

export default handler;
