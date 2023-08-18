import { NextFunction, Request, Response } from "express";
import ManageToken from "../../utils/ManageToken";
import { errorResult } from "../../utils/Respons";

const UserAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers["authorization"];
    const authToken = bearerToken?.split(" ")[1];
    const secretKey: any = process.env.JWT_TOKEN;
    if (!authToken) {
      return res
        .status(400)
        .json({ status: 400, message: "Unauthorized", data: null });
    }
    const result: any = ManageToken.verifyToken(authToken, secretKey);
    if (!result) {
      return res
        .status(401)
        .json({ status: 401, message: "Unauthorized", data: null });
    }

    res.locals.userEmail = result?.email;
    res.locals.roleId = result?.roleId;
    next();
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

const SuperAdminVerification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roleId = res.locals.roleId;
    if (roleId !== 1) {
      return res
        .status(403)
        .json({ status: 403, message: "Forbidden", data: null });
    }
    next();
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

const AdminVerification = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = res.locals.roleId;
    if (roleId !== 2) {
      return res
        .status(403)
        .json({ status: 403, message: "Forbidden", data: null });
    }
    next();
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

const UserVerification = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = res.locals.roleId;
    if (roleId !== 3) {
      return res
        .status(403)
        .json({ status: 403, message: "Forbidden", data: null });
    }
    next();
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

export default {
  UserAuth,
  SuperAdminVerification,
  AdminVerification,
  UserVerification,
};
