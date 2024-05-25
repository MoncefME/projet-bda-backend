import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  ORACLE_USER: process.env.ORACLE_USER,
  ORACLE_PASSWORD: process.env.ORACLE_PASSWORD,
  ORACLE_CONNECTION_STRING: process.env.ORACLE_CONNECTION_STRING,
  PORT: process.env.PORT,
  SERVERPORT: process.env.SERVERPORT
};
