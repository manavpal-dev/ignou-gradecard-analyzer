import { Request, Response } from "express";
import { programService } from "../services/program.service";
import { getCache, setCache } from "../utils/cache";
import { FOUR_MONTHS } from "../constants/cache.constants";

export const programController = async (req: Request, res: Response) => {
  try {
    const { categoryType } = req.body;

    // Validate Input first
    if (!categoryType) {
      return res.status(400).json({
        success: false,
        message: "CategoryType is required",
      });
    }

    const cacheKey = `programs-${categoryType}`;

    const cached = getCache(cacheKey);
    if (cached) {
      return res.status(200).json({
        success: true,
        programOptions: cached,
      });
    }

    // call service
    const result = await programService(categoryType);

    if (result.success) {
      setCache(cacheKey, result.programOptions, FOUR_MONTHS);

      return res
        .status(200)
        .json({ success: true, programOptions: result.programOptions });
    } else {
      return res.status(500).json({
        success: false,
        message: result.message || "Failed to fetch programs",
      });
    }
  } catch (error) {
    console.error("Program Controller Error: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};
