import OracleDB from "oracledb";
import { connect, close } from "../../config/database.config";

interface LongestBreak {
  start_date: Date;
  end_date: Date;
  days: number;
}

// const getLongestBreak = async (): Promise<LongestBreak | null> => {
//   let connection: OracleDB.Connection = await connect();

//   try {
//     const query = `BEGIN :cursor := longest_break(); END;`;

//     const bindVars = {
//       cursor: { dir: OracleDB.BIND_OUT, type: OracleDB.CURSOR },
//     };

//     const result = await connection.execute<{
//       cursor: OracleDB.ResultSet<[Date, Date, number]>;
//     }>(query, bindVars);

//     if (!result.outBinds || !result.outBinds.cursor) {
//       throw new Error("Failed to fetch longest break from database");
//     }

//     const resultSet = result.outBinds.cursor;
//     const longestBreak = await resultSet.getRow();

//     if (!longestBreak) {
//       return null;
//     }

//     const [start_date, end_date, days] = longestBreak;

//     return { start_date, end_date, days };
//   } catch (error) {
//     console.error("Error getting longest break:", error);
//     return null;
//   } finally {
//     if (connection) await close(connection);
//   }
// };

// export { getLongestBreak };


import moment from 'moment';

export const getLongestBreak = async (): Promise<LongestBreak | null> => {
  let connection: OracleDB.Connection = await connect();

  try {
    const query = `BEGIN :cursor := longest_break(); END;`;

    const bindVars = {
      cursor: { dir: OracleDB.BIND_OUT, type: OracleDB.CURSOR },
    };

    const result = await connection.execute<{
      cursor: OracleDB.ResultSet<[string, string, number]>;
    }>(query, bindVars);

    if (!result.outBinds || !result.outBinds.cursor) {
      throw new Error("Failed to fetch longest break from database");
    }

    const resultSet = result.outBinds.cursor;
    const longestBreak = await resultSet.getRow();

    if (!longestBreak) {
      return null;
    }

    const [start_date_str, end_date_str, days] = longestBreak;
    const start_date = moment(start_date_str, 'DD-MMM-YY hh.mm.ss.SSSSSSSSS A ZZ').toDate();
    const end_date = moment(end_date_str, 'DD-MMM-YY hh.mm.ss.SSSSSSSSS A ZZ').toDate();

    return { start_date, end_date, days };
  } catch (error) {
    console.error("Error getting longest break:", error);
    return null;
  } finally {
    if (connection) await close(connection);
  }
};
