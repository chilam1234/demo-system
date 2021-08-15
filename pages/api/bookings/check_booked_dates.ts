import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect";

import { checkBookedDatesOfRoom } from "../../../controllers/bookingControllers";

import onError from "../../../middlewares/errors";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.get(checkBookedDatesOfRoom);

export default handler;
