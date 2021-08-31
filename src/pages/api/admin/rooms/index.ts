import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { allAdminRooms } from "../../../../../controllers/roomControllers";
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
