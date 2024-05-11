import OracleDB from "oracledb";
import { connect, close } from "../../config/database.config";
import { formatDate } from "../../utils/date-formatter";

interface LongestBreak {
  start_date: string;
  end_date: string;
  days: number;
}

const getLongestBreak = async (): Promise<LongestBreak | null> => {
  let connection: OracleDB.Connection = await connect();

  try {
    const query = `BEGIN :cursor := longest_break(); END;`;

    const bindVars = {
      cursor: { dir: OracleDB.BIND_OUT, type: OracleDB.CURSOR },
    };

    const result = await connection.execute<{
      cursor: OracleDB.ResultSet<[Date, Date, number]>;
    }>(query, bindVars);

    if (!result.outBinds || !result.outBinds.cursor) {
      throw new Error("Failed to fetch longest break from database");
    }

    const resultSet = result.outBinds.cursor;
    const longestBreak = await resultSet.getRow();

    if (!longestBreak) {
      return null;
    }

    const start_date = formatDate(longestBreak[0]);
    const end_date = formatDate(longestBreak[1]);
    const days = longestBreak[2];

    return { start_date, end_date, days };
  } catch (error) {
    console.error("Error getting longest break:", error);
    return null;
  } finally {
    if (connection) await close(connection);
  }
};

export { getLongestBreak };
