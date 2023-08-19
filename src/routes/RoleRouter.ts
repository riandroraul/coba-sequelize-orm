import { Router } from "express";
import RoleController from "../controllers/RoleController";
import Authorization from "../middleware/auth";

const router = Router();

router.get(
  "/",
  Authorization.UserAuth,
  Authorization.UserVerification,
  RoleController.getRoles
);
router.get(
  "/:id",
  Authorization.UserAuth,
  Authorization.UserVerification,
  RoleController.getRoleById
);
router.post(
  "/create",
  Authorization.UserAuth,
  Authorization.AdminVerification,
  RoleController.createRole
);
router.put(
  "/update/:id",
  Authorization.UserAuth,
  Authorization.AdminVerification,
  RoleController.updateRole
);
router.delete(
  "/delete/:id",
  Authorization.UserAuth,
  Authorization.SuperAdminVerification,
  RoleController.deleteRole
);

export default router;
