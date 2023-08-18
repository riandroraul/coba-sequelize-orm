import express from "express";
import RoleController from "../controllers/RoleController";
import Authentication from "../middleware/auth";

const router = express.Router();

router.get(
  "/",
  Authentication.UserAuth,
  Authentication.UserVerification,
  RoleController.getRoles
);
router.get(
  "/:id",
  Authentication.UserAuth,
  Authentication.UserVerification,
  RoleController.getRoleById
);
router.post(
  "/create",
  Authentication.UserAuth,
  Authentication.AdminVerification,
  RoleController.createRole
);
router.put(
  "/update/:id",
  Authentication.UserAuth,
  Authentication.AdminVerification,
  RoleController.updateRole
);
router.delete(
  "/delete/:id",
  Authentication.UserAuth,
  Authentication.SuperAdminVerification,
  RoleController.deleteRole
);

export default router;
