import nc from "next-connect";
import dbConnect from "../../lib/dbConnect";

import { currentUserProfile } from "../../controllers/authControllers";

import { isAuthenticatedUser } from "../../middlewares/auth";
import onError from "../../middlewares/errors";
import { NextApiRequest, NextApiResponse } from "next";

dbConnect();

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

handler.use(isAuthenticatedUser).get(currentUserProfile);

export default handler;
