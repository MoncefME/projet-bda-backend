import OracleDB from "oracledb";
import { ENV } from "./env.config";

process.env.TNS_ADMIN = 'D:\\Oracle_21c\\homes\\OraDB21Home1\\NETWORK\\ADMIN';

const databaseConfig = {
  user: "BDA",
  password: "meriem",
  connectionString: "orcl",
  configDir: process.env.TNS_ADMIN
};


async function getConnection() {
  try {
    const connection = await OracleDB.getConnection(databaseConfig);
    return connection;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw new Error("Unable to connect to the database");
  }
}

async function commit(connection: OracleDB.Connection) {
  try {
    await connection.commit();
  } catch (error) {
    console.error("Unable to commit the transaction:", error);
    throw new Error("Unable to commit the transaction");
  }
}

async function closeConnection(connection: OracleDB.Connection) {
  try {
    await connection.close();
  } catch (error) {
    console.error("Unable to close the connection:", error);
    throw new Error("Unable to close the connection");
  }
}

export { getConnection as connect, commit, closeConnection as close };
