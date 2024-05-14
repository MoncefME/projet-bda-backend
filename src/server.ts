import express from "express";
import { configureMiddleware } from "./middleware/middleware.config";
import { activityRouter, insightsRouter } from "./routes";
import { ENV } from "./config/env.config";

const app = express();

configureMiddleware(app);

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.use("/activities", activityRouter);
app.use("/insights", insightsRouter);

app.listen(ENV.SERVERPORT, () => {
  console.log(`Server is running on http://localhost:${ENV.SERVERPORT}`);
});
