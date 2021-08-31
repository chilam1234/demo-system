import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { allRooms, newRoom } from "../../../controllers/roomControllers";
import dbConnect from "../../../lib/dbConnect";
import { isAuthenticatedUser, authorizeRoles } from "../../../middlewares/auth";
import onError from "../../../middlewares/errors";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

dbConnect();

handler.get(allRooms);

handler.use(isAuthenticatedUser, authorizeRoles("admin")).post(newRoom);

export default handler;
