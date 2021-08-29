import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import dbConnect from "../../../../lib/dbConnect";

import { resetPassword } from "../../../../controllers/authControllers";

import onError from "../../../../middlewares/errors";

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
