import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";

import { webhookCheckout } from "../../controllers/paymentControllers";

import onError from "../../middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });
dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(webhookCheckout);

export default handler;
