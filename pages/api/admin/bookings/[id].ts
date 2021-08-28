import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";

import { deleteBookingByAdmin } from "../../../../controllers/bookingControllers";

import onError from "../../../../middlewares/errors";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../middlewares/auth";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });
dbConnect();

/**
 * @swagger
 * /api/bookings/:id:
 *   delete:
 *     description: Delete the booking
 *     responses:
 *       204:
 *         description: no content
 *     tags:
 *       - bookings
 */
handler
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .delete(deleteBookingByAdmin);

export default handler;
