// Import necessary modules
import oracledb from "oracledb";
import { connect, close } from "../../config/database.config";

// Define the function to get speed vs. distance for an activity
const getSpeedVsDistance = async (
    activity_id: number,
    startMonth: number,
    endMonth: number,
    year: number
): Promise<{ distance: number; averageSpeed: number }[] | null> => {
    let connection: oracledb.Connection = await connect();
    try {

        const query = `BEGIN :result := get_speed_vs_distance(:activity_id, :startMonth, :endMonth, :year); END;`;
        const bindVars = {
            result: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
            activity_id,
            startMonth,
            endMonth,
            year,
        };

        const result = await connection.execute<{ result: oracledb.ResultSet<[number,number]> }>(query, bindVars);
        if (!result.outBinds || !result.outBinds.result) {
            throw new Error("Failed to fetch longest break from database");
          }
        const cursor = result.outBinds.result;
        // const rows = await cursor.getRows();
        // console.log(rows);
        // if (!rows) {
        //     return null;
        //   }

        // Extract and format the result
        const speedVsDistance: { distance: number; averageSpeed: number }[]=[];

        let row;
        while ((row = await cursor.getRow())) {
            console.log(row);
            const [distance, averageSpeed] = row;
            speedVsDistance.push({ distance, averageSpeed });
        }

        return speedVsDistance;
    } catch (error) {
        console.error("Error getting speed vs. distance:", error);
        return null;
    } finally {
        if (connection) {
            await close(connection);
        }
    }
};

export { getSpeedVsDistance };
