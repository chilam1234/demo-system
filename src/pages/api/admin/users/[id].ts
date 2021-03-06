import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import {
  getUserDetails,
  updateUser,
  deleteUser,
} from "../../../../server/controllers/authControllers";
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
 * /api/admin/users/:id:
 *   get:
 *     description: get user detail by id
 *     responses:
 *       200:
 *         description: user details
 *     tags:
 *       - Admin
 */

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(getUserDetails);

/**
 * @swagger
 * /api/admin/users/:id:
 *   put:
 *     description: update user
 *     responses:
 *       200:
 *         description: success
 *     tags:
 *       - Admin
 */
handler.use(isAuthenticatedUser, authorizeRoles("admin")).put(updateUser);

/**
 * @swagger
 * /api/admin/users/:id:
 *   delete:
 *     description: delete user
 *     responses:
 *       200:
 *         description: success
 *     tags:
 *       - Admin
 */
handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteUser);

export default handler;
