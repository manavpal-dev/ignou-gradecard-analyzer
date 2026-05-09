import { Request, Response } from "express";
import { categoryService } from "../services/categories.service";
import { getCache, setCache } from "../utils/cache";
import { FOUR_MONTHS } from "../constants/cache.constants";

export const categoriesController = async (req: Request, res: Response) => {
  try {
    const cacheKey = "categories-list";

    const cached = getCache(cacheKey);
    if (cached) {
      return res.status(200).json({
        success: true,
        categoryOptions: cached,
      });
    }

    const categories = await categoryService();

    if (categories.success) {
      setCache(cacheKey, categories.categoryOptions, FOUR_MONTHS);

      return res
        .status(200)
        .json({ success: true, categoryOptions: categories.categoryOptions });
    } else {
      return res.status(404).json({
        success: false,
        message: categories.message || "No Category Response",
      });
    }
  } catch (error) {
    console.error("Category Controller Error:", error);
    return res.status(500).json({ message: "Server Error!" });
  }
};
