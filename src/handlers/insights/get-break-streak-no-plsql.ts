import OracleDB from "oracledb";
import { connect, close } from "../../config/database.config";
import { formatDate } from "../../utils/date-formatter";

interface Activity {
  id: number;
  athlete_id: number;
  start_date_local: Date;
}

export const getActivities = async (
  athlete_id: number
): Promise<Activity[]> => {
  let connection: OracleDB.Connection = await connect();

  try {
    const query = `SELECT id, athlete_id, start_date_local FROM activities WHERE athlete_id = :athlete_id ORDER BY start_date_local`;
    const result = await connection.execute<[number, number, string]>(query, [
      athlete_id,
    ]);

    if (!result.rows) {
      throw new Error("No activities found for user");
    }

    return result.rows.map((row) => ({
      id: row[0],
      athlete_id: row[1],
      start_date_local: new Date(row[2]),
    }));
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  } finally {
    if (connection) await close(connection);
  }
};

const MS_IN_A_DAY = 24 * 60 * 60 * 1000;

const getLongestStreakNoPLSQL = async (
  user_id: number
): Promise<{ start_date: string; end_date: string; days: number } | null> => {
  const activities = await getActivities(user_id);
  if (activities.length === 0) {
    return null;
  }

  // Sort activities by start_date_local
  activities.sort(
    (a, b) => a.start_date_local.getTime() - b.start_date_local.getTime()
  );

  let longestStreak = 1;
  let currentStreak = 1;
  let longestStreakStart = new Date(activities[0].start_date_local);
  let longestStreakEnd = new Date(activities[0].start_date_local);
  let currentStreakStart = new Date(activities[0].start_date_local);

  for (let i = 1; i < activities.length; i++) {
    const currentDate = new Date(activities[i].start_date_local);
    const previousDate = new Date(activities[i - 1].start_date_local);

    // Calculate difference in days
    const daysDifference =
      (currentDate.setHours(0, 0, 0, 0) - previousDate.setHours(0, 0, 0, 0)) /
      MS_IN_A_DAY;

    if (daysDifference === 1) {
      currentStreak++;
    } else {
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
        longestStreakStart = new Date(currentStreakStart);
        longestStreakEnd = new Date(previousDate);
      }
      currentStreak = 1;
      currentStreakStart = new Date(currentDate);
    }
  }

  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
    longestStreakStart = currentStreakStart;
    longestStreakEnd = new Date(
      activities[activities.length - 1].start_date_local
    );
  }

  return {
    start_date: formatDate(longestStreakStart),
    end_date: formatDate(longestStreakEnd),
    days: longestStreak,
  };
};

const getLongestBreakNoPLSQL = async (
  user_id: number
): Promise<{ start_date: string; end_date: string; days: number } | null> => {
  const activities = await getActivities(user_id);
  if (activities.length === 0) {
    return null;
  }

  // Sort activities by start_date_local
  activities.sort(
    (a, b) => a.start_date_local.getTime() - b.start_date_local.getTime()
  );

  let longestBreak = 0;
  let longestBreakStart: Date | null = null;
  let longestBreakEnd: Date | null = null;

  for (let i = 1; i < activities.length; i++) {
    const currentDate = new Date(activities[i].start_date_local);
    const previousDate = new Date(activities[i - 1].start_date_local);

    // Calculate difference in days
    const daysDifference =
      (currentDate.setHours(0, 0, 0, 0) - previousDate.setHours(0, 0, 0, 0)) /
      MS_IN_A_DAY;

    if (daysDifference > longestBreak + 1) {
      // +1 because we're looking for the gap between activities
      longestBreak = daysDifference - 1;
      longestBreakStart = new Date(previousDate);
      longestBreakEnd = new Date(currentDate);
    }
  }

  if (longestBreakStart && longestBreakEnd) {
    return {
      start_date: formatDate(longestBreakStart),
      end_date: formatDate(longestBreakEnd),
      days: longestBreak,
    };
  }

  return null;
};

export { getLongestStreakNoPLSQL, getLongestBreakNoPLSQL };
