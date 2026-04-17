import express from "express";
import { programController } from "../controllers/programs.controller";

const programRouter = express.Router();

programRouter.post("/program", programController);

export default programRouter;
