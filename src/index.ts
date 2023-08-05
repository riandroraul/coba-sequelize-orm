import express from "express";
import dotenv from "dotenv";
import RoleRouter from "./routes/Router";

dotenv.config();
const app = express();
const port = process.env.PORT;
const base_url = process.env.BASE_URL;

app.use(express.json());

app.use("/role", RoleRouter);

app.listen(port, () => {
  console.log(`server running at ${base_url}:${port}`);
});
