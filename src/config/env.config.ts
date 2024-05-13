import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectionString: process.env.ORACLE_CONNECTION_STRING,
  configDir: 'D:\Oracle_21c\homes\OraDB21Home1\NETWORK\ADMIN'
};
