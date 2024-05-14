// Import necessary modules
import oracledb from "oracledb";
import { connect, close } from "../../config/database.config";

// Define the function to get the best effort for 1km
const getBestEffort5km = async (athlete_id : number): Promise<string | null> =>  {
    let connection: oracledb.Connection = await connect();
  try {

    const query = `
    BEGIN
    :result := get_best_effort_5km(:athlete_id);
    END;
    `;
    const bindVars = {
        result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        athlete_id: athlete_id,
      };
    const result = await connection.execute<{ result: number }>(query, bindVars);
    if (!result.outBinds || !result.outBinds.result) {
        return "0";
    }
    const elapsedSeconds = result.outBinds.result;
    // Convert seconds to minutes and remaining seconds
    const minutes: number = Math.floor(elapsedSeconds / 60);
    const seconds: number = elapsedSeconds % 60;

    // Construct the result string
    const formattedTime: string = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return formattedTime;



  } catch (error) {
    console.error("Error getting best effort for 5km:", error);
    return null;
  } finally {
    if (connection) {
      await close(connection);
    }
  }
};

export{getBestEffort5km};