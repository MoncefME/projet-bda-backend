import { Request, Response } from "express";
import { connect, close } from "../../config/database.config";
import OracleDB from "oracledb";

interface LongestStreak {
  start_date: Date;
  end_date: Date;
  days: number;
}

const getLongestStreak = async (): Promise<LongestStreak | null> => {
  let connection: OracleDB.Connection = await connect();

  try {
    const query = `BEGIN :cursor := longest_streak(); END;`;

    const bindVars = {
      cursor: { dir: OracleDB.BIND_OUT, type: OracleDB.CURSOR },
    };

    const result = await connection.execute<{
      cursor: OracleDB.ResultSet<[Date, Date, number]>;
    }>(query, bindVars);

    if (!result.outBinds || !result.outBinds.cursor) {
      throw new Error("Failed to fetch longest streak from database");
    }

    const resultSet = result.outBinds.cursor;
    const longestStreak = await resultSet.getRow();

    if (!longestStreak) {
      return null;
    }

    const [start_date, end_date, days] = longestStreak;

    return { start_date, end_date, days };
  } catch (error) {
    console.error("Error getting longest streak:", error);
    return null;
  } finally {
    if (connection) await close(connection);
  }
};
export { getLongestStreak };
