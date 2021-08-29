import nc from "next-connect";
import dbConnect from "../../../../lib/dbConnect";

import { allAdminRooms } from "../../../../controllers/roomControllers";

import onError from "../../../../middlewares/errors";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../middlewares/auth";
import { NextApiRequest, NextApiResponse } from "next";

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
