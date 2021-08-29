import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";

import { registerUser } from "../../../controllers/authControllers";

import onError from "../../../middlewares/errors";

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
