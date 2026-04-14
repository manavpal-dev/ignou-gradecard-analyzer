import { Request, Response } from "express";
import { categoryService } from "../services/categories.service";

export const categoriesController = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService();

    if (categories.success) {
      return res
        .status(200)
        .json({ success: true, categoryOptions: categories.categoryOptions });
    } else {
      return res
        .status(404)
        .json({
          success: false,
          message: categories.message || "No Category Response",
        });
    }
  } catch (error) {
    console.error("Category Controller Error:", error);
    return res.status(500).json({ message: "Server Error!" });
  }
};
