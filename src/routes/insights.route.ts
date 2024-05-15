import { Router, Request, Response } from "express";
import {
  getLongestBreakNoPLSQL,
  getLongestStreakNoPLSQL,
  getLongestBreakPLSQL,
  getLongestStreakPLSQL,
  getDayMostActivities,
} from "../handlers/insights";

const insightsRouter = Router();

insightsRouter.get(
  "/find-longest-streak",
  async (req: Request, res: Response) => {
    try {
      const result = await getLongestStreakPLSQL();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

insightsRouter.get(
  "/find-longest-streak-no-plsql",
  async (req: Request, res: Response) => {
    try {
      const result = await getLongestStreakNoPLSQL(43957994);
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
      const result = await getLongestBreakPLSQL();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

insightsRouter.get(
  "/find-longest-break-no-plsql",
  async (req: Request, res: Response) => {
    try {
      const result = await getLongestBreakNoPLSQL(43957994);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

insightsRouter.get(
  "/day-most-activities",
  async (req: Request, res: Response) => {
    try {
      const startDateParam = req.query.start_date as string;
      const endDateParam = req.query.end_date as string;
      console.log("startDateParam", startDateParam);
      console.log("endDateParam", endDateParam);
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
