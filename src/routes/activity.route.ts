import { Router, Request, Response } from "express";
import { getActivityById, getAllActivities } from "../handlers/activity";
import { getLongestBreak, getLongestStreak } from "../handlers/insights";

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

export default activityRouter;
