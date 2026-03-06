import express from "express"
import { browserController } from "../controllers/browser.controller"

const browserRouter = express.Router();

browserRouter.post("/test-browser", browserController);

export default browserRouter