import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const db_host = process.env.DB_HOST as string;
const db_username = process.env.DB_USERNAME as string;
const db_pass = process.env.DB_PASS as string;
const db_name = process.env.DB_NAME as string;

const sequelizeConnection = new Sequelize(db_name, db_username, db_pass, {
  host: db_host,
  dialect: "mysql",
});
// .authenticate()
// .then((res: any) => {
//   console.log("Connection has been established successfully.");
// })
// .catch((error: Error) => {
//   console.error("Unable to connect to the database:", error);
// });

export default sequelizeConnection;
