import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from "../../../../controllers/roomControllers";
import dbConnect from "../../../../lib/dbConnect";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../middlewares/auth";
import onError from "../../../../middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.get(getSingleRoom);

handler.use(isAuthenticatedUser, authorizeRoles("admin")).put(updateRoom);

handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteRoom);

export default handler;
