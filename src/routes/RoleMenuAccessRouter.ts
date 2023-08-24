import { Router } from "express";
import Authorization from "../middleware/auth";
import RoleMenuAccessController from "../controllers/RoleMenuAccessController";
import MenuValidation from "../middleware/validaton/MenuValidation";

const router = Router();

router.post(
  "/",
  MenuValidation.CreateRoleMenuAccessValidation,
  Authorization.UserAuth,
  RoleMenuAccessController.CreateAccess
);
router.get(
  "/",
  Authorization.UserAuth,
  Authorization.SuperAdminVerification,
  RoleMenuAccessController.GetList
);
router.get(
  "/get/all",
  Authorization.UserAuth,
  Authorization.AdminVerification,
  RoleMenuAccessController.GetAll
);
router.get(
  "/:id",
  Authorization.UserAuth,
  Authorization.AdminVerification,
  RoleMenuAccessController.GetDetail
);
router.put(
  "/:id",
  MenuValidation.CreateRoleMenuAccessValidation,
  Authorization.UserAuth,
  Authorization.AdminVerification,
  RoleMenuAccessController.UpdateAccess
);
router.delete(
  "/:id",
  Authorization.UserAuth,
  Authorization.AdminVerification,
  RoleMenuAccessController.SoftDelete
);

export default router;
