import express from "express";
import dotenv from "dotenv";
import RoleRouter from "./routes/RoleRouter";
import UserRouter from "./routes/UserRouter";
import MenuAccessRouter from "./routes/RoleMenuAccessRouter";
import cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const port = process.env.PORT;
const base_url = process.env.BASE_URL;

app.use(express.json());
app.use(cookieParser());

app.use("/role", RoleRouter);
app.use("/user", UserRouter);
app.use("/role-menu-access", MenuAccessRouter);

app.listen(port, () => {
  console.log(`server running at ${base_url}:${port}`);
});
