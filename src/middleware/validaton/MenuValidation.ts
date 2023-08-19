import { NextFunction, Request, Response } from "express";
import Validator from "validatorjs";
import { errorResult } from "../../utils/Respons";
import MasterMenu from "../../db/models/MasterMenu";

const CreateMenuValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, icon, ordering } = req.body;
    const data = { name, icon, ordering };

    const rules: Validator.Rules = {
      name: "required|string|max:50",
      icon: "required|string",
      ordering: "required|number",
    };
    const validate = new Validator(data, rules);
    if (validate.fails()) {
      return res.status(400).json({
        status: 400,
        message: "Validation error!",
        error: validate.errors,
      });
    }
    next();
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

const CreateSubmenuValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } =
      req.body;

    const data = {
      name,
      masterMenuId,
      url,
      title,
      icon,
      ordering,
      isTargetSelf,
    };
    const rules: Validator.Rules = {
      name: "required|string|max:50",
      masterMenuId: "required|number",
      url: "required|string",
      title: "required|string|max:50",
      icon: "required|string",
      ordering: "required|number",
      isTargetSelf: "required|boolean",
    };
    const validate = new Validator(data, rules);
    if (validate.fails()) {
      return res.status(400).json({
        status: 400,
        message: "Validation error!",
        error: validate.errors,
      });
    }
    const menu = await MasterMenu.findOne({
      where: {
        id: masterMenuId,
        active: true,
      },
    });
    if (!menu) {
      return res.status(400).json({
        status: 400,
        message: "Not found!",
        error: {
          errors: {
            masterMenuId: "Master menu id not found!",
          },
        },
      });
    }
    next();
  } catch (error) {
    return errorResult(error, res, 400);
  }
};

export default { CreateMenuValidation, CreateSubmenuValidation };
