import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { deleteBookingByAdmin } from "../../../../server/controllers/bookingControllers";
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
 * /api/admin/bookings/:id:
 *   delete:
 *     description: Delete the booking
 *     responses:
 *       204:
 *         description: no content
 *     tags:
 *       - Admin
 */
handler
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .delete(deleteBookingByAdmin);

export default handler;
