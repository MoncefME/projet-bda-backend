import oracledb from "oracledb";
import { connect, close } from "../../config/database.config";

const createNewRun = async (
    athleteId:number, 
    name:String, 
    distance:number, 
    sportType:String, 
    
): Promise<void> =>  {
    let connection: oracledb.Connection = await connect();
    try {
        const query = `
            BEGIN
                create_new_run(
                    p_athlete_id => :athleteId,
                    p_name => :name,
                    p_distance => :distance,
                    p_sport_type => :sportType

                );
            END;
        `;
        const bindVars = {
            athleteId: { val: athleteId, type: oracledb.NUMBER },
            name: { val: name, type: oracledb.STRING },
            distance: { val: distance, type: oracledb.NUMBER },
            sportType: { val: sportType, type: oracledb.STRING },
        };

        await connection.execute(query, bindVars);
        await connection.commit();
    } catch (error) {
        console.error("Error creating new run:", error);
    } finally {
        if (connection) {
            await close(connection);
        }
    }
};

export { createNewRun };
