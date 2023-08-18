import express from "express";
import UserController from "../controllers/UserController";
import UserValidation from "../middleware/validaton/UserValidation";
import Authenticate from "../middleware/auth";

const router = express.Router();

router.post(
  "/signup",
  UserValidation.RegisterValidation,
  UserController.Register
);

router.post("/login", UserController.Login);
router.get("/refresh-token", UserController.RefreshToken);
router.get("/current-user", Authenticate.UserAuth, UserController.UserDetail);
router.get("/logout", Authenticate.UserAuth, UserController.UserLogout);

export default router;
