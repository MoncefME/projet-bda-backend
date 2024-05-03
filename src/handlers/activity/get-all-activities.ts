import { connect, close } from "../../config/database.config";

const getAllActivities = async () => {
  const connection = await connect();
  try {
    const result = await connection.execute("SELECT * FROM ACTIVITIES");
    return result.rows;
  } catch (error) {
    console.error("Unable to get all activities:", error);
    return null;
  } finally {
    await close(connection);
  }
};

export { getAllActivities };
