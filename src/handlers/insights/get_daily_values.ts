import OracleDB from "oracledb";
import { connect, close } from "../../config/database.config";

interface DailyValue {
    date: string;
    count: number;
    level: number;
}

const getDailyValue = async (year: number): Promise<DailyValue[] | null> => {
    let connection: OracleDB.Connection = await connect();

    try {
        const query = `BEGIN :cursor := get_daily_distnace( :year ); END;`;

        const bindVars = {
            cursor: { dir: OracleDB.BIND_OUT, type: OracleDB.CURSOR },
            year: { dir: OracleDB.BIND_IN, val: year, type: OracleDB.NUMBER }, 
        };

        const result = await connection.execute<{
            cursor: OracleDB.ResultSet<[string, string, number, number]>;
        }>(query, bindVars);

        if (!result.outBinds || !result.outBinds.cursor) {
            throw new Error("Failed to fetch longest streak from database");
        }

        const resultSet = result.outBinds.cursor;
        let dailyValues: DailyValue[] = [];
        const dailyValue = await resultSet.getRows();

        if (!dailyValue) {
            return null;
        }
        
        for await (const row of dailyValue) {
            const date = row[0];
            const count = Math.floor(Math.random() * 10);
            const level = Math.ceil(row[3]);

            dailyValues.push({ date, count, level });
        }

        return dailyValues;
    } catch (error) {
        console.error("Error getting longest streak:", error);
        return null;
    } finally {
        if (connection) await close(connection);
    }
};
export { getDailyValue };
