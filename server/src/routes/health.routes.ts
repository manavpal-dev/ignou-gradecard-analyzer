import express from "express";
import { health } from "../controllers/health.controller";

const healthRouter = express.Router();

healthRouter.get("/health",health)

export default healthRouter;