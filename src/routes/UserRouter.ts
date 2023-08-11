import express from "express";
import UserController from "../controllers/UserController";
import UserValidation from "../middleware/validaton/UserValidation";

const router = express.Router();

router.post(
  "/signup",
  UserValidation.RegisterValidation,
  UserController.Register
);

export default router;
