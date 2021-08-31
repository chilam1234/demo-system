import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { allAdminRooms } from "../../../../server/controllers/roomControllers";
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
 * /api/admin/rooms:
 *   delete:
 *     description: get all admin rooms
 *     responses:
 *       200:
 *         description: all rooms
 *     tags:
 *       - Admin
 */
handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminRooms);

export default handler;
