import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { currentUserProfile } from "../../../controllers/authControllers";
import dbConnect from "../../../lib/dbConnect";
import { isAuthenticatedUser } from "../../../middlewares/auth";
import onError from "../../../middlewares/errors";

dbConnect();

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

handler.use(isAuthenticatedUser).get(currentUserProfile);

export default handler;
