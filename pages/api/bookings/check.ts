import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

import { checkRoomBookingAvailability } from "../../../controllers/bookingControllers";

import onError from "../../../middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.get(checkRoomBookingAvailability);

export default handler;
