import { Router, Request, Response } from "express";
import { getLongestBreak, getLongestStreak, getDayMostActivities } from "../handlers/insights";

const insightsRouter = Router();

insightsRouter.get(
  "/find-longest-streak",
  async (req: Request, res: Response) => {
    try {
      const result = await getLongestStreak();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

insightsRouter.get(
  "/find-longest-break",
  async (req: Request, res: Response) => {
    try {
      const result = await getLongestBreak();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// insightsRouter.get(
//   "/day-most-activities",
//   async (req: Request, res: Response) => {
//     try {
//       const startDate = new Date("2024-01-01");
//       const endDate = new Date("2024-12-30");
//       const result = await getDayMostActivities(startDate, endDate);
//       res.status(200).json(result);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   }
// );
insightsRouter.get(
  "/day-most-activities",
  async (req: Request, res: Response) => {
    try {
      const startDateParam = req.body.start_date ;
      const endDateParam = req.body.end_date;
      const startDate = new Date(startDateParam);
      const endDate = new Date(endDateParam);
      const result = await getDayMostActivities(startDate, endDate);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);




export default insightsRouter;
