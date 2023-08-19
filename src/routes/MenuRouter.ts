import { Router } from "express";
import MasterMenuController from "../controllers/MasterMenuController";
import Authorization from "../middleware/auth";
import MenuValidation from "../middleware/validaton/MenuValidation";

const router = Router();

router.post(
  "/create",
  MenuValidation.CreateMenuValidation,
  Authorization.UserAuth,
  Authorization.SuperAdminVerification,
  MasterMenuController.CreateMenu
);

router.get(
  "/",
  Authorization.UserAuth,
  Authorization.SuperAdminVerification,
  MasterMenuController.GetListMenu
);

router.get(
  "/all",
  Authorization.UserAuth,
  Authorization.AdminVerification,
  MasterMenuController.GetAllMenu
);

router.get(
  "/detail/:id",
  Authorization.UserAuth,
  Authorization.SuperAdminVerification,
  MasterMenuController.GetDetailMenu
);

router.patch(
  "/update/:id",
  MenuValidation.CreateMenuValidation,
  Authorization.UserAuth,
  Authorization.SuperAdminVerification,
  MasterMenuController.UpdateMenu
);

router.delete(
  "/update/:id",
  Authorization.UserAuth,
  Authorization.SuperAdminVerification,
  MasterMenuController.SoftDeleteMenu
);

router.delete(
  "/update/:id",
  Authorization.UserAuth,
  Authorization.SuperAdminVerification,
  MasterMenuController.DeletePermanent
);
