import nc from "next-connect";
import dbConnect from "../../../../lib/dbConnect";

import { allAdminBookings } from "../../../../controllers/bookingControllers";

import onError from "../../../../middlewares/errors";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../middlewares/auth";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     description: Delete the booking
 *     responses:
 *       204:
 *         description: no content
 *     tags:
 *       - bookings
 */
handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminBookings);

export default handler;
