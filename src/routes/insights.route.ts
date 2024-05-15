import { Router, Request, Response } from "express";
import {
  getLongestBreakNoPLSQL,
  getLongestStreakNoPLSQL,
  getLongestBreakPLSQL,
  getLongestStreakPLSQL,
  getBestEffort1km,
  getBestEffort5km,
  getBestEffort10km,
  getBestEffortHM,
  getTotalActivities,
  getTotalDistance,
  getTotalDuration,
  getMonthlyDistances,
  getDayMostActivities,
} from "../handlers/insights";

const insightsRouter = Router();

insightsRouter.get(
  "/find-longest-streak",
  async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "startDate and endDate are required" });
    }

    try {
      const result = await getLongestStreakPLSQL(
        startDate as string,
        endDate as string
      );
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
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
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "startDate and endDate are required" });
    }

    try {
      const result = await getLongestBreakPLSQL(
        startDate as string,
        endDate as string
      );
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
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
  "/monthly-distances",
  async (req: Request, res: Response) => {
    try {
      const year = req.query.year
        ? parseInt(req.query.year as string)
        : new Date().getFullYear();
      const monthlyDistances = await getMonthlyDistances(year);
      res.status(200).json(monthlyDistances);
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

insightsRouter.get(
  "/find-total-activities",
  async (req: Request, res: Response) => {
    try {
      const { startMonth, endMonth, year } = req.query;

      if (!startMonth || !endMonth || !year) {
        return res
          .status(400)
          .json({ error: "startMonth, endMonth, and year are required" });
      }

      const totalActivities = await getTotalActivities(
        Number(startMonth),
        Number(endMonth),
        Number(year)
      );

      if (totalActivities !== null) {
        return res.status(200).json({ totalActivities });
      } else {
        return res
          .status(500)
          .json({ error: "Failed to fetch total activities from database" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

insightsRouter.get(
  "/find-total-distance",
  async (req: Request, res: Response) => {
    try {
      const { startMonth, endMonth, year } = req.query;

      if (!startMonth || !endMonth || !year) {
        return res
          .status(400)
          .json({ error: "startMonth, endMonth, and year are required" });
      }

      const totalDistance = await getTotalDistance(
        Number(startMonth),
        Number(endMonth),
        Number(year)
      );

      if (totalDistance !== null) {
        return res.status(200).json({ totalDistance });
      } else {
        return res
          .status(500)
          .json({ error: "Failed to fetch total distance from database" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

insightsRouter.get(
  "/find-total-duration",
  async (req: Request, res: Response) => {
    try {
      const { startMonth, endMonth, year } = req.query;

      if (!startMonth || !endMonth || !year) {
        return res
          .status(400)
          .json({ error: "startMonth, endMonth, and year are required" });
      }

      const totalDuration = await getTotalDuration(
        parseInt(startMonth as string),
        parseInt(endMonth as string),
        parseInt(year as string)
      );

      if (totalDuration !== null) {
        return res.status(200).json({ totalDuration });
      } else {
        return res
          .status(500)
          .json({ error: "Failed to fetch total duration from database" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

insightsRouter.get("/best-effort-1km", async (req, res) => {
  try {
    const { athleteId, startMonth, endMonth, year } = req.query;

    if (!startMonth || !endMonth || !year) {
      return res
        .status(400)
        .json({ error: "startMonth, endMonth, and year are required" });
    }

    if (!athleteId) {
      return res.status(400).json({ error: "athleteId is required" });
    }

    const bestEffort1km = await getBestEffort1km(
      Number(athleteId),
      parseInt(startMonth as string),
      parseInt(endMonth as string),
      parseInt(year as string)
    );

    if (bestEffort1km !== null) {
      return res.status(200).json({ bestEffort1km });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to fetch best effort for 1km from database" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

insightsRouter.get("/best-effort-5km", async (req, res) => {
  try {
    const { athleteId, startMonth, endMonth, year } = req.query;

    if (!startMonth || !endMonth || !year) {
      return res
        .status(400)
        .json({ error: "startMonth, endMonth, and year are required" });
    }

    if (!athleteId) {
      return res.status(400).json({ error: "athleteId is required" });
    }

    const bestEffort5km = await getBestEffort5km(
      Number(athleteId),
      parseInt(startMonth as string),
      parseInt(endMonth as string),
      parseInt(year as string)
    );

    if (bestEffort5km !== null) {
      return res.status(200).json({ bestEffort5km });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to fetch best effort for 1km from database" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

insightsRouter.get("/best-effort-10km", async (req, res) => {
  try {
    const { athleteId, startMonth, endMonth, year } = req.query;

    if (!startMonth || !endMonth || !year) {
      return res
        .status(400)
        .json({ error: "startMonth, endMonth, and year are required" });
    }

    if (!athleteId) {
      return res.status(400).json({ error: "athleteId is required" });
    }

    const bestEffort10km = await getBestEffort10km(
      Number(athleteId),
      parseInt(startMonth as string),
      parseInt(endMonth as string),
      parseInt(year as string)
    );

    if (bestEffort10km !== null) {
      return res.status(200).json({ bestEffort10km });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to fetch best effort for 10km from database" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

insightsRouter.get("/best-effort-hm", async (req, res) => {
  try {
    const { athleteId, startMonth, endMonth, year } = req.query;

    if (!startMonth || !endMonth || !year) {
      return res
        .status(400)
        .json({ error: "startMonth, endMonth, and year are required" });
    }

    if (!athleteId) {
      return res.status(400).json({ error: "athleteId is required" });
    }

    const bestEffortHM = await getBestEffortHM(
      Number(athleteId),
      parseInt(startMonth as string),
      parseInt(endMonth as string),
      parseInt(year as string)
    );

    if (bestEffortHM !== null) {
      return res.status(200).json({ bestEffortHM });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to fetch best effort for HM from database" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
export default insightsRouter;
