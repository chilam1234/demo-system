import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";

import { updateProfile } from "../../../controllers/authControllers";

import { isAuthenticatedUser } from "../../../middlewares/auth";
import onError from "../../../middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.use(isAuthenticatedUser).patch(updateProfile);

export default handler;
