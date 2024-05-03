import OracleDB from "oracledb";
import { ENV } from "./env.config";

const databaseConfig: OracleDB.ConnectionAttributes = {
  user: ENV.ORACLE_USER,
  password: ENV.ORACLE_PASSWORD,
  connectString: ENV.ORACLE_CONNECTION_STRING,
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
