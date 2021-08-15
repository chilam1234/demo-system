import ErrorHandler from "../utils/errorHandler";
import { getSession } from "next-auth/client";

const isAuthenticatedUser = async (req, _, next) => {
  const session = await getSession({ req });

  if (!session) {
    throw new ErrorHandler("Login first to access this resource", 401);
  }

  req.user = session.user;
  next();
};

const authorizeRoles = (...roles) => {
  return (req, _, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ErrorHandler(
        `Role (${req.user.role}) is not allowed to access this resource.`,
        403
      );
    }

    next();
  };
};

export { isAuthenticatedUser, authorizeRoles };
