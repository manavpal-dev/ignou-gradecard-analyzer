import express from "express";
import { categoriesController } from "../controllers/categories.controller";

const categoriesRouter = express.Router();

categoriesRouter.get(
    "/categories",categoriesController
);

export default categoriesRouter;