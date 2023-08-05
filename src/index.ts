import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT;
const base_url = process.env.BASE_URL;

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "success",
    query: req.query,
  });
});

app.listen(port, () => {
  console.log(`server running at ${base_url}:${port}`);
});
