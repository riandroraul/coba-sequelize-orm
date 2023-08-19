import { Request, Response } from "express";
import { errorResult } from "../utils/Respons";
import Submenu from "../db/models/Submenu";

const CreateSubmenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } =
      req.body;

    const submenu = await Submenu.create({
      name,
      masterMenuId,
      url,
      title,
      icon,
      ordering,
      isTargetSelf,
      active: true,
    });
    return res.status(201).json({
      status: 201,
      message: "Data Created!",
      data: submenu,
    });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

const GetListSubmenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const submenu = await Submenu.findAll({
      where: {
        active: true,
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: submenu,
    });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

const GetAllSubmenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const submenu = await Submenu.findAll();
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: submenu,
    });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

const GetDetailSubmenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const submenuDetail = await Submenu.findOne({
      where: {
        id: req.params.id,
        active: true,
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: submenuDetail,
    });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

const UpdateSubmenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } =
      req.body;
    const submenuDetail = await Submenu.findOne({
      where: {
        id: req.params.id,
        active: true,
      },
    });

    if (!submenuDetail) {
      return res.status(404).json({
        status: 404,
        message: "Not Found",
        data: null,
      });
    }
    const updateSubmenu = await Submenu.update(
      { name, masterMenuId, url, title, icon, ordering, isTargetSelf },
      { where: { id: submenuDetail?.id, active: true } }
    );
    return res.status(200).json({
      status: 200,
      message: "Data Updated!",
      data: updateSubmenu,
    });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

const SoftDeleteSubmenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const submenu = await Submenu.findOne({
      where: {
        id: req.params.id,
        active: true,
      },
    });
    if (!submenu) {
      return res.status(404).json({
        status: 404,
        message: "Not Found",
        data: null,
      });
    }
    submenu.active = false;
    await submenu.save();
    return res.status(200).json({
      status: 200,
      message: "Removed",
      data: null,
    });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

const PermanentDeleteSubmenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const submenu = await Submenu.findOne({
      where: {
        id: req.params.id,
        active: true,
      },
    });
    if (!submenu) {
      return res.status(404).json({
        status: 404,
        message: "Not Found",
        data: null,
      });
    }
    await submenu.destroy();
    return res.status(200).json({
      status: 200,
      message: "Removed",
      data: null,
    });
  } catch (error: any) {
    console.log(error.message);
    return errorResult(error, res, 400);
  }
};

export default {
  CreateSubmenu,
  GetListSubmenu,
  GetAllSubmenu,
  GetDetailSubmenu,
  UpdateSubmenu,
  SoftDeleteSubmenu,
  PermanentDeleteSubmenu,
};
