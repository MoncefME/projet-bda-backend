import oracledb from "oracledb";
import { connect, close } from "../../config/database.config";

const getTotalDuration = async (
  startMonth: number,
  endMonth: number,
  year: number
): Promise<number | null> => {
    let connection: oracledb.Connection = await connect();
  try {

    const query = `
      BEGIN
        :result := get_total_duration_between_months(:startMonth, :endMonth, :year);
      END;
    `;

    const bindVars = {
      result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      startMonth,
      endMonth,
      year,
    };

    const result = await connection.execute<{ result: number }>(query, bindVars);

    if (!result.outBinds || !result.outBinds.result) {
        return 0;
      throw new Error("Failed to fetch total duration from database");
    }

    return result.outBinds.result;
  } catch (error) {
    console.error("Error getting total duration:", error);
    return null;
  } finally {
    if (connection) {
      await close(connection);
    }
  }
};

export { getTotalDuration };
