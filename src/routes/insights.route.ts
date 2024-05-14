import { Router, Request, Response } from "express";
import { getLongestBreak, getLongestStreak } from "../handlers/insights";
import { getMonthlyDistances } from "../handlers/insights/get-distest-per-month";

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

insightsRouter.get("/monthly-distances", async (req: Request, res: Response) => {
  try {
    const year = req.query.year ? parseInt(req.query.year as string) : new Date().getFullYear();
    const monthlyDistances = await getMonthlyDistances(year);
    res.status(200).json(monthlyDistances);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default insightsRouter;
