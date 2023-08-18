import { Request, Response } from "express";
import { errorResult } from "../utils/Respons";
import { comparePassword, hashingPassword } from "../utils/ManagePassword";
import ManageToken from "../utils/ManageToken";
import User from "../db/models/User";
import { where } from "sequelize";
import Role from "../db/models/Role";

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
    const secretKeyToken = process.env.JWT_TOKEN as string;
    const secretKeyRefToken = process.env.JWT_REFRESH_TOKEN as string;
    const token = ManageToken.generateToken(userData, secretKeyToken, "1h");
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

const RefreshToken = (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);

    if (!refreshToken) {
      return res
        .status(401)
        .json({ status: 401, message: "Unauthorized", data: null });
    }
    const decodeUser: any = ManageToken.verifyToken(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN || ""
    );
    console.log(decodeUser);

    if (!decodeUser) {
      return res
        .status(401)
        .json({ status: 401, message: "Unauthorized", data: null });
    }
    const secretKeyToken: string = process.env.JWT_TOKEN || "";
    const token = ManageToken.generateToken(
      {
        name: decodeUser.name,
        email: decodeUser.email,
        roleId: decodeUser.roleId,
        verified: decodeUser.verified,
        active: decodeUser.active,
      },
      secretKeyToken,
      "30s"
    );

    const user = {
      name: decodeUser.name,
      email: decodeUser.email,
      roleId: decodeUser.roleId,
      verified: decodeUser.verified,
      active: decodeUser.active,
      token,
    };

    return res
      .status(200)
      .json({ status: 200, message: "success", data: user });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

const UserDetail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const email = res.locals.userEmail;
    const user = await User.findOne({
      where: {
        email,
      },
      attributes: { exclude: ["password", "accessToken"] },
      include: {
        model: Role,
        attributes: ["id", "roleName"],
      },
    });
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, message: "user not found", data: null });
    }
    return res
      .status(200)
      .json({ status: 200, message: "success", data: user });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

const UserLogout = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res
        .status(200)
        .json({ status: 200, message: "user logout", data: null });
    }
    const email = res.locals.userEmail;
    const user = await User.findOne({
      where: {
        email,
      },
      attributes: { exclude: ["password", "accessToken"] },
    });
    if (!user) {
      return res
        .status(200)
        .json({ status: 200, message: "user logout", data: null });
    }
    await user.update({ accessToken: null }, { where: { email } });
    res.clearCookie("refreshToken");
    return res
      .status(200)
      .json({ status: 200, message: "user logout", data: null });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

export default { Register, Login, RefreshToken, UserDetail, UserLogout };
