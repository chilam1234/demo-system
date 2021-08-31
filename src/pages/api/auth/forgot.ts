import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { forgotPassword } from "../../../controllers/authControllers";
import dbConnect from "../../../lib/dbConnect";
import onError from "../../../middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

/**
 * @swagger
 * /api/auth/forgot:
 *   post:
 *     description: request reset password email
 *     responses:
 *       201:
 *         description: success
 *     tags:
 *       - Auth
 */
handler.post(forgotPassword);

export default handler;
