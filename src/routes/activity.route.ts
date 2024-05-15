import { Router, Request, Response } from "express";
import { getActivityById, getAllActivities } from "../handlers/activity";
import { getSpeedVsDistance } from "../handlers/activity/get-speed-vs-distance";

const activityRouter = Router();

activityRouter.get("/all", async (req: Request, res: Response) => {
  try {
    const result = await getAllActivities();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

activityRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const result = await getActivityById(req.params.id);

    if (!result) {
      res.status(404).json({ message: "Activity not found" });
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

activityRouter.get("/speed-vs-distance/:activity_id", async (req: Request, res: Response) => {
  try {
      const { activity_id } = req.params;
      const {startMonth, endMonth, year } = req.query;

    if (!startMonth || !endMonth || !year) {
      return res.status(400).json({ error: "startMonth, endMonth, and year are required" });
    }

      // Call the backend function to get speed vs. distance data
      const speedVsDistance = await getSpeedVsDistance(
        Number(activity_id),
        parseInt(startMonth as string),
        parseInt(endMonth as string),
        parseInt(year as string)
      );

      if (speedVsDistance !== null) {
          return res.status(200).json(speedVsDistance);
      } else {
          return res.status(500).json({ error: "Failed to fetch speed vs. distance data" });
      }
  } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal server error" });
  }
});


export default activityRouter;
