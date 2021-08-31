import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { currentUserProfile } from "../../server/controllers/authControllers";
import dbConnect from "../../server/lib/dbConnect";
import { isAuthenticatedUser } from "../../server/middlewares/auth";
import onError from "../../server/middlewares/errors";

dbConnect();

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

handler.use(isAuthenticatedUser).get(currentUserProfile);

export default handler;
