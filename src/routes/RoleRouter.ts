import express from "express";
import RoleController from "../controllers/RoleController";
import Authentication from "../middleware/validaton/UserValidation";

const router = express.Router();

router.get("/", Authentication.UserAuth, RoleController.getRoles);
router.get("/:id", RoleController.getRoleById);
router.post("/create", RoleController.createRole);
router.put("/update/:id", RoleController.updateRole);
router.delete("/delete/:id", RoleController.deleteRole);

export default router;
