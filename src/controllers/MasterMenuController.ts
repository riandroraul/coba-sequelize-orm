import { Request, Response } from "express";
import { errorResult } from "../utils/Respons";
import MasterMenu from "../db/models/MasterMenu";

const CreateMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, icon, ordering } = req.body;
    const newMenu = await MasterMenu.create({
      name,
      icon,
      ordering,
      active: true,
    });
    return res.status(201).json({
      status: 201,
      message: "Menu Created!",
      data: newMenu,
    });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

const GetListMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const listmenu = await MasterMenu.findAll({
      where: {
        active: true,
      },
    });
    return res.status(200).json({
      status: 200,
      message: "success",
      data: listmenu,
    });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

const GetAllMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const listmenu = await MasterMenu.findAll();
    return res.status(200).json({
      status: 200,
      message: "success",
      data: listmenu,
    });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

const GetDetailMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const menuDetail = await MasterMenu.findAll({
      where: {
        id: req.params.id,
        active: true,
      },
    });
    if (!menuDetail) {
      return res.status(404).json({
        status: 404,
        message: "Not Found",
        data: null,
      });
    }
    return res.status(200).json({
      status: 200,
      message: "success",
      data: menuDetail,
    });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

const UpdateMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, icon, ordering } = req.body;
    const menu = await MasterMenu.findOne({
      where: {
        id: req.params.id,
        active: true,
      },
    });
    if (!menu) {
      return res.status(404).json({
        status: 404,
        message: "Not Found",
        data: null,
      });
    }
    const updatedMenu = await MasterMenu.update(
      { name, icon, ordering },
      {
        where: { id: req.params.id },
      }
    );
    return res.status(200).json({
      status: 200,
      message: "Updated",
      data: updatedMenu,
    });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

const SoftDeleteMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const menu = await MasterMenu.findOne({
      where: {
        id: req.params.id,
        active: true,
      },
    });
    if (!menu) {
      return res.status(404).json({
        status: 404,
        message: "Not Found",
        data: null,
      });
    }
    menu.active = false;
    const softDelete = await menu.save();
    return res.status(200).json({
      status: 200,
      message: "success",
      data: softDelete,
    });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

const DeletePermanent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const menu = await MasterMenu.findOne({
      where: {
        id: req.params.id,
        active: true,
      },
    });
    if (!menu) {
      return res.status(404).json({
        status: 404,
        message: "Not Found",
        data: null,
      });
    }
    const deleted = await menu.destroy();
    return res.status(200).json({
      status: 200,
      message: "success",
      data: deleted,
    });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

export default {
  CreateMenu,
  GetListMenu,
  GetAllMenu,
  GetDetailMenu,
  UpdateMenu,
  SoftDeleteMenu,
  DeletePermanent,
};
