import { Request, Response } from "express";
import { errorResult } from "../utils/Respons";
import User from "../db/models/User";
import { comparePassword, hashingPassword } from "../utils/ManagePassword";
import ManageToken from "../utils/ManageToken";

const Register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 400,
        message: "password must be matching!",
        data: null,
      });
    }
    const hashPassword = await hashingPassword(password);
    const userRegistered = await User.create({
      name,
      email,
      password: hashPassword,
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

const Login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    const matchingPassword = await comparePassword(
      password,
      user ? user.password : ""
    );
    if (!user || !matchingPassword) {
      return res.status(400).json({
        status: 400,
        message: "Email or Password Wrong!",
        data: null,
      });
    }

    const userData: any = {
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      verified: user.verified,
      active: user.active,
    };
    const secretKeyToken: string = process.env.JWT_TOKEN || "";
    const secretKeyRefToken = process.env.JWT_REFRESH_TOKEN || "";
    const token = ManageToken.generateToken(userData, secretKeyToken, "10m");
    const refreshToken = ManageToken.generateToken(
      userData,
      secretKeyRefToken,
      "1d"
    );
    user.accessToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    userData.token = token;
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: userData,
    });
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

export default { Register, Login };
