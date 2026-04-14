import express from "express";
import { browserController } from "../controllers/result.controller";
import { apiKeyMiddleware } from "../middlewares/apikey.middleware";
import { limiter } from "../middlewares/rateLimit.middleware";

const resultRouter = express.Router();

resultRouter.post(
  "/test-browser",
  apiKeyMiddleware,
  limiter,
  browserController,
);

export default resultRouter;
