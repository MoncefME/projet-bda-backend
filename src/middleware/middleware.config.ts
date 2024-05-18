import express from "express";
import cors from "cors";
// import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

export const configureMiddleware = (app: express.Application) => {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // app.use(helmet());
  app.use(morgan("dev"));
  app.use(compression());
};
