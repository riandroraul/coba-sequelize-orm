import express from "express";
import RoleController from "../controllers/RoleController";

const router = express.Router();

router.get("/", RoleController.getRoles);
router.get("/:id", RoleController.getRoleById);
router.post("/create", RoleController.createRole);
router.put("/update/:id", RoleController.updateRole);
router.delete("/delete/:id", RoleController.deleteRole);

export default router;
