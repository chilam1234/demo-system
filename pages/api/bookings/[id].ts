import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect";

import { getBookingDetails } from "../../../controllers/bookingControllers";

import { isAuthenticatedUser } from "../../../middlewares/auth";
import onError from "../../../middlewares/errors";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(getBookingDetails);

export default handler;
