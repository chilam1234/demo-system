import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from "../../../server/controllers/roomControllers";
import dbConnect from "../../../server/lib/dbConnect";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../server/middlewares/auth";
import onError from "../../../server/middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.get(getSingleRoom);

handler.use(isAuthenticatedUser, authorizeRoles("admin")).put(updateRoom);

handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteRoom);

export default handler;
