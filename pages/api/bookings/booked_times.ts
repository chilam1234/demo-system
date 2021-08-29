import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect";

import { checkBookedRoomTimes } from "../../../controllers/bookingControllers";

import onError from "../../../middlewares/errors";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.get(checkBookedRoomTimes);

export default handler;
