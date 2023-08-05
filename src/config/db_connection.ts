import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const db_host = process.env.DB_HOST;
const db_username = process.env.DB_NAME as string;
const db_pass = process.env.DB_PASS;
const db_name = process.env.DB_NAME as string;

const sequelizeConnection = new Sequelize(db_username, db_name, db_pass, {
  host: db_host,
  dialect: "mysql",
});

export default sequelizeConnection;
