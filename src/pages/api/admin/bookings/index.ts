import nc from "next-connect";

import { allAdminBookings } from "../../../../../controllers/bookingControllers";
import dbConnect from "../../../../../lib/dbConnect";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../../middlewares/auth";
import onError from "../../../../../middlewares/errors";

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
