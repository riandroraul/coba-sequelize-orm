import { Request, Response } from "express";
import { errorResult } from "../utils/respons";
import User from "../db/models/User";

const Register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, confrimPassword } = req.body;
    if (password !== confrimPassword) {
      return res.status(400).json({
        status: 400,
        message: "password must be matching!",
        data: null,
      });
    }
    const userRegistered = User.create({
      name,
      email,
      password,
      active: true,
      verified: true,
      accessToken: "asdasd",
      roleId: 3,
    });
    return res.status(201).json({
      status: 201,
      message: "User Created!",
      data: userRegistered,
    });
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

export default { Register };
