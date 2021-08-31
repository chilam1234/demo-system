import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { resetPassword } from "../../../../server/controllers/authControllers";
import dbConnect from "../../../../server/lib/dbConnect";
import onError from "../../../../server/middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

/**
 * @swagger
 * /api/auth/reset/:token:
 *   put:
 *     description: reset password with token
 *     responses:
 *       200:
 *         description: success
 *     tags:
 *       - Auth
 */
handler.put(resetPassword);

export default handler;
