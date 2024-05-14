import { Request, Response } from "express";
import { connect, close } from "../../config/database.config";
import OracleDB from "oracledb";

interface ActivityResult {
  max_activities_day: string;
  max_activities_count: number;
  min_activities_day: string;
  min_activities_count: number;
}

const getDayMostActivities = async (
  start_date: Date,
  end_date: Date
): Promise<ActivityResult> => {
  let connection: OracleDB.Connection = await connect();
  try {
    connection = await connect();

    const query = `
        BEGIN
            :result := find_activities(:START_DATE_PARAM, :END_DATE_PARAM);
        END;
    `;

    const bindVars = {
      result: { dir: OracleDB.BIND_OUT, type: "ACTIVITY_RESULT" },
      start_date_param: start_date,
      end_date_param: end_date,
    };

    const oracleDate = new Date(start_date.getTime()).toISOString();

    const result = await connection.execute<{ result: ActivityResult }>(
      query,
      bindVars
    );

    if (!result.outBinds) {
      throw new Error("Failed to fetch activities from database");
    }

    return result.outBinds.result;
  } catch (error) {
    console.error("Error finding activities:", error);
    throw error; // Rethrow the error to be caught by the caller
  } finally {
    if (connection) await close(connection);
  }
};

export { getDayMostActivities };
