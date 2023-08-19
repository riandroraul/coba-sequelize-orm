import { Router } from "express";
import SubmenuController from "../controllers/SubmenuController";
import Authorization from "../middleware/auth";
import MenuValidation from "../middleware/validaton/MenuValidation";
const router = Router();

router.get(
  "/",
  Authorization.UserAuth,
  Authorization.SuperAdminVerification,
  SubmenuController.GetListSubmenu
);
router.post(
  "/create",
  MenuValidation.CreateSubmenuValidation,
  Authorization.UserAuth,
  Authorization.SuperAdminVerification,
  SubmenuController.CreateSubmenu
);
router.get(
  "/all",
  Authorization.UserAuth,
  Authorization.SuperAdminVerification,
  SubmenuController.GetAllSubmenu
);
router.get(
  "/detail/:id",
  Authorization.UserAuth,
  Authorization.SuperAdminVerification,
  SubmenuController.GetDetailSubmenu
);
router.patch(
  "/update/:id",
  MenuValidation.CreateSubmenuValidation,
  Authorization.UserAuth,
  Authorization.SuperAdminVerification,
  SubmenuController.UpdateSubmenu
);
router.delete(
  "/soft-delete/:id",
  Authorization.UserAuth,
  Authorization.SuperAdminVerification,
  SubmenuController.SoftDeleteSubmenu
);
router.delete(
  "/permanent-delete/:id",
  Authorization.UserAuth,
  Authorization.SuperAdminVerification,
  SubmenuController.PermanentDeleteSubmenu
);
