import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { allAdminUsers } from "../../../../server/controllers/authControllers";
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
 * /api/admin/users:
 *   get:
 *     description: get all users
 *     responses:
 *       200:
 *         description: success
 *     tags:
 *       - Admin
 */
handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminUsers);

export default handler;
