import { connect, close } from "../../config/database.config";
import { Activity, ActivityRow } from "../../models/activity.model";

const getAllActivities = async (): Promise<Activity[] | null> => {
  const connection = await connect();
  try {
    const result = await connection.execute("SELECT * FROM ACTIVITIES");

    const activityRows = result.rows as ActivityRow[];

    if (!activityRows || activityRows.length === 0) {
      return null;
    }

    const activities: Activity[] = activityRows.map(
      (activityRow: ActivityRow) => {
        const [
          activity_id,
          athlete_id,
          name,
          distance,
          moving_time,
          elapsed_time,
          total_elevation_gain,
          sport_type,
          start_date,
          start_date_local,
          timezone,
          utc_offset,
          achievement_count,
          kudos_count,
          comment_count,
          athlete_count,
          trainer,
          commute,
          manual,
          is_private,
          visibility,
          average_speed,
          max_speed,
          average_cadence,
          average_heartrate,
          max_heartrate,
          display_hide_heartrate_option,
          elev_high,
          elev_low,
          pr_count,
          total_photo_count,
          has_kudoed,
          description,
          calories,
          has_heartrate,
        ] = activityRow;

        return {
          id: activity_id,
          athlete_id,
          name,
          distance,
          moving_time,
          elapsed_time,
          total_elevation_gain,
          sport_type,
          start_date,
          start_date_local,
          timezone,
          utc_offset,
          achievement_count,
          kudos_count,
          comment_count,
          athlete_count,
          trainer,
          commute,
          manual,
          private: is_private,
          visibility,
          average_speed,
          max_speed,
          average_cadence,
          average_heartrate,
          max_heartrate,
          display_hide_heartrate_option,
          elev_high,
          elev_low,
          pr_count,
          total_photo_count,
          has_kudoed,
          description,
          calories,
          has_heartrate,
        };
      }
    );

    return activities;
  } catch (error) {
    console.error("Unable to get all activities:", error);
    return null;
  } finally {
    await close(connection);
  }
};

export { getAllActivities };
