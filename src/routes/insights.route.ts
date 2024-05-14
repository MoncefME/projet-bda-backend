import { Router, Request, Response } from "express";
import {
  getLongestBreakNoPLSQL,
  getLongestStreakNoPLSQL,
  getLongestBreakPLSQL,
  getLongestStreakPLSQL,
} from "../handlers/insights";
import { getTotalActivities } from "../handlers/insights/get-total-activities";
import { getTotalDistance } from "../handlers/insights/get-total-distance";
import { getTotalDuration } from "../handlers/insights/get-total-duration";
import { getBestEffort1km } from "../handlers/insights/get-best-effort-1km";
import { getBestEffort5km } from "../handlers/insights/get-best-effort-5km";
import { getBestEffort10km } from "../handlers/insights/get-best-effort-10km";
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

insightsRouter.get("/find-total-activities", async (req: Request, res: Response) => {
  try {
    const { startMonth, endMonth, year } = req.query;

    if (!startMonth || !endMonth || !year) {
      return res.status(400).json({ error: "startMonth, endMonth, and year are required" });
    }

    const totalActivities = await getTotalActivities(
      Number(startMonth),
      Number(endMonth),
      Number(year)
    );
    
    if (totalActivities !== null) {
      return res.status(200).json({ totalActivities });
    } else {
      return res.status(500).json({ error: "Failed to fetch total activities from database" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

insightsRouter.get("/find-total-distance", async (req: Request, res: Response) => {
  try {
    const { startMonth, endMonth, year } = req.query;

    if (!startMonth || !endMonth || !year) {
      return res.status(400).json({ error: "startMonth, endMonth, and year are required" });
    }

    const totalDistance = await getTotalDistance(
      Number(startMonth),
      Number(endMonth),
      Number(year)
    );

    if (totalDistance !== null) {
      return res.status(200).json({ totalDistance });
    } else {
      return res.status(500).json({ error: "Failed to fetch total distance from database" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

insightsRouter.get("/find-total-duration", async (req: Request, res: Response) => {
  try {
    const { startMonth, endMonth, year } = req.query;

    if (!startMonth || !endMonth || !year) {
      return res.status(400).json({ error: "startMonth, endMonth, and year are required" });
    }

    const totalDuration = await getTotalDuration(
      parseInt(startMonth as string),
      parseInt(endMonth as string),
      parseInt(year as string)
    );

    if (totalDuration !== null) {
      return res.status(200).json({ totalDuration });
    } else {
      return res.status(500).json({ error: "Failed to fetch total duration from database" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

insightsRouter.get("/best-effort-1km", async (req, res) => {
  try {
    const { athleteId } = req.query;

    if (!athleteId) {
      return res.status(400).json({ error: "athleteId is required" });
    }

    const bestEffort1km = await getBestEffort1km(Number(athleteId));
    
    if (bestEffort1km !== null) {
      return res.status(200).json({ bestEffort1km });
    } else {
      return res.status(500).json({ error: "Failed to fetch best effort for 1km from database" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


insightsRouter.get("/best-effort-5km", async (req, res) => {
  try {
    const { athleteId } = req.query;

    if (!athleteId) {
      return res.status(400).json({ error: "athleteId is required" });
    }

    const bestEffort5km = await getBestEffort5km(Number(athleteId));
    
    if (bestEffort5km !== null) {
      return res.status(200).json({ bestEffort5km });
    } else {
      return res.status(500).json({ error: "Failed to fetch best effort for 1km from database" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


insightsRouter.get("/best-effort-10km", async (req, res) => {
  try {
    const { athleteId } = req.query;

    if (!athleteId) {
      return res.status(400).json({ error: "athleteId is required" });
    }

    const bestEffort10km = await getBestEffort10km(Number(athleteId));
    
    if (bestEffort10km !== null) {
      return res.status(200).json({ bestEffort10km });
    } else {
      return res.status(500).json({ error: "Failed to fetch best effort for 10km from database" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
export default insightsRouter;
