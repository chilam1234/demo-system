import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { allRooms, newRoom } from "../../../server/controllers/roomControllers";
import dbConnect from "../../../server/lib/dbConnect";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../server/middlewares/auth";
import onError from "../../../server/middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.get(allRooms);

handler.use(isAuthenticatedUser, authorizeRoles("admin")).post(newRoom);

export default handler;
