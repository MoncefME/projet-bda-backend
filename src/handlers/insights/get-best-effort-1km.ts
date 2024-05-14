// Import necessary modules
import oracledb from "oracledb";
import { connect, close } from "../../config/database.config";

// Define the function to get the best effort for 1km
const getBestEffort1km = async (athlete_id : number): Promise<number | null> =>  {
    let connection: oracledb.Connection = await connect();
  try {

    const query = `
    BEGIN
    :result := get_best_effort_1km(:athlete_id);
    END;
    `;
    const bindVars = {
        result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        athlete_id: athlete_id,
      };
    const result = await connection.execute<{ result: number }>(query, bindVars);
    if (!result.outBinds || !result.outBinds.result) {
        return 0;
    }

    return result.outBinds.result;
  } catch (error) {
    console.error("Error getting best effort for 1km:", error);
    return null;
  } finally {
    if (connection) {
      await close(connection);
    }
  }
};

export{getBestEffort1km};