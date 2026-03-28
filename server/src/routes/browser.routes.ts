import express from "express";
import { browserController } from "../controllers/browser.controller";
import { apiKeyMiddleware } from "../middlewares/apikey.middleware";
import { limiter } from "../middlewares/rateLimit.middleware";

const browserRouter = express.Router();

browserRouter.post(
  "/test-browser",
  apiKeyMiddleware,
  limiter,
  browserController,
);

export default browserRouter;
