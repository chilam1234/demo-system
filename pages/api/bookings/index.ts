import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../lib/dbConnect";

import { newBooking } from "../../../controllers/bookingControllers";

import { isAuthenticatedUser } from "../../../middlewares/auth";
import onError from "../../../middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.use(isAuthenticatedUser).post(newBooking);

export default handler;
