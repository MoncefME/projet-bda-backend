// Import necessary modules
import oracledb from "oracledb";
import { connect, close } from "../../config/database.config";

// Define the function to get the best effort for 1km
const getBestEffortHM = async (
    athlete_id : number,
    startMonth: number,
    endMonth: number,
    year: number
): Promise<string | null> =>  {
    let connection: oracledb.Connection = await connect();
  try {

    const query = `
    BEGIN
    :result := get_best_effort_half_marathon(:athlete_id, :startMonth, :endMonth, :year);
    END;
    `;
    const bindVars = {
        result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        athlete_id: athlete_id,
        startMonth,
        endMonth,
        year,
      };
    const result = await connection.execute<{ result: number }>(query, bindVars);
    if (!result.outBinds || !result.outBinds.result) {
        return "0";
    }
    const elapsedSeconds = result.outBinds.result;
    // Calculate hours, minutes, and remaining seconds
    const hours: number = Math.floor(elapsedSeconds / 3600);
    const minutes: number = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds: number = elapsedSeconds % 60;

    // Construct the result string
    const formattedTime: string = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return formattedTime;




  } catch (error) {
    console.error("Error getting best effort for 1km:", error);
    return null;
  } finally {
    if (connection) {
      await close(connection);
    }
  }
};

export{getBestEffortHM};