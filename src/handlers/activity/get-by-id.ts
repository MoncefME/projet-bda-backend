import { Request, Response } from "express";
import { connect, close } from "../../config/database.config";

const getActivityById = async (id: string) => {
  const connection = await connect();
  try {
    const result = await connection.execute(
      "SELECT * FROM ACTIVITIES WHERE ID = :id",
      [id]
    );
    return result.rows;
  } catch (error) {
    console.error("Unable to get activity by id:", error);
    return null;
  } finally {
    await close(connection);
  }
};

export { getActivityById };
