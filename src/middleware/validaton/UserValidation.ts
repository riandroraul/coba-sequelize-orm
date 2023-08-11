import { NextFunction, Request, Response, request } from "express";
import Validator from "validatorjs";
import { errorResult } from "../../utils/Respons";
import User from "../../db/models/User";
import ManageToken from "../../utils/ManageToken";
const RegisterValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const data = { name, email, password, confirmPassword };
    const rules: Validator.Rules = {
      name: "required|string|max:50",
      email: "required|email",
      password: "required|min:8",
      confirmPassword: "required|same:password",
    };

    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return res.status(400).json({
        status: 400,
        message: "Validation error!",
        error: validate.errors,
      });
    }
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({
        status: 400,
        message: "Validation error!",
        error: {
          errors: {
            email: "email already used!",
          },
        },
      });
    }
    next();
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

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
    const result = ManageToken.verifyToken(authToken, secretKey);
    next();
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

export default { RegisterValidation, UserAuth };
