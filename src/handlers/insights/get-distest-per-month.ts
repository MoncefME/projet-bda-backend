import OracleDB from "oracledb";
import { connect, close } from "../../config/database.config";

const getMonthlyDistances = async (year: number) => {
    let connection: OracleDB.Connection = await connect();
  try {
    const query = `BEGIN :cursor := get_monthly_distances(:year); END;`;
    const bindVars = {
      cursor: { dir: OracleDB.BIND_OUT, type: OracleDB.CURSOR },
      year: year,
    };
    const result = await connection.execute<{ cursor: OracleDB.ResultSet<[number, number]> }>(query, bindVars);
    if (!result.outBinds || !result.outBinds.cursor) {
      throw new Error("Failed to fetch monthly distances from database");
    }
    const resultSet = result.outBinds.cursor;
    const monthlyDistances: { month: number; distance: number }[] = [];
    let row;
    while ((row = await resultSet.getRow())) {
      const [month, distance] = row;
      monthlyDistances.push({ month, distance });
    }
    return monthlyDistances;
  } catch (error) {
    console.error("Error getting monthly distances:", error);
    throw error;
  } finally {
    if (connection) await close(connection);
  }
};

export { getMonthlyDistances };