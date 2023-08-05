import { Request, Response } from "express";
import Role from "../db/models/role";
import errorResult from "../../utils/error";

const getRoles = async (req: Request, res: Response): Promise<Response> => {
  try {
    const roles = await Role.findAll({
      where: { active: true },
    });
    return res.status(200).json({
      status: 200,
      message: "success",
      data: roles,
    });
  } catch (error) {
    return errorResult(error, res, 500);
  }
};

const getRoleById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const findRole = await Role.findByPk(req.params.id);
    if (!findRole) {
      return res.status(400).json({
        status: 400,
        message: "data not found!",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data founded!",
      data: findRole,
    });
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

const createRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { roleName, active } = req.body;
    const newRole = await Role.create({
      roleName,
      active,
    });
    return res.status(201).json({
      status: 201,
      message: "success",
      data: newRole,
    });
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

const updateRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { roleName, active } = req.body;
    let role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(400).json({
        status: 400,
        message: "data not found!",
        data: null,
      });
    }
    roleName ? (role.roleName = roleName) : role.roleName;
    active ? (role.active = active) : role.active;
    await role.save();

    return res.status(200).json({
      status: 200,
      message: "Data updated!",
      data: role,
    });
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

const deleteRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deletedRole = await Role.findByPk(req.params.id);
    if (!deletedRole) {
      return res.status(400).json({
        status: 400,
        message: "data not found!",
        data: null,
      });
    }

    await deletedRole.destroy();
    return res.status(200).json({
      status: 200,
      message: "Data deleted!",
      data: deletedRole,
    });
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

export default { getRoles, getRoleById, createRole, updateRole, deleteRole };
