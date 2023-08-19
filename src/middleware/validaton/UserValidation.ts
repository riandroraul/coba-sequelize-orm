import { NextFunction, Request, Response } from "express";
import Validator from "validatorjs";
import { errorResult } from "../../utils/Respons";
import User from "../../db/models/User";

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

export default { RegisterValidation };
