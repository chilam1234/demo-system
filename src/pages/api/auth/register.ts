import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { registerUser } from "../../../../controllers/authControllers";
import dbConnect from "../../../../lib/dbConnect";
import onError from "../../../../middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

/**
 * @swagger
 * /api/auth/users:
 *   post:
 *     description: register user
 *     responses:
 *       201:
 *         description: success
 *     tags:
 *       - Auth
 */
handler.post(registerUser);

export default handler;
