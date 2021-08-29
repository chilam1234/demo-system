import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

import { checkRoomBookingAvailability } from "../../../controllers/bookingControllers";

import onError from "../../../middlewares/errors";
import { isAuthenticatedUser } from "../../../middlewares/auth";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(checkRoomBookingAvailability);

export default handler;
