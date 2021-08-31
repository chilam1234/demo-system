import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { updateProfile } from "../../../../controllers/authControllers";
import dbConnect from "../../../../lib/dbConnect";
import { isAuthenticatedUser } from "../../../../middlewares/auth";
import onError from "../../../../middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

/**
 * @swagger
 * /api/me:
 *   patch:
 *     description: update current user
 *     responses:
 *       200:
 *         description: success
 *     tags:
 *       - Me
 */
handler.use(isAuthenticatedUser).patch(updateProfile);

export default handler;
