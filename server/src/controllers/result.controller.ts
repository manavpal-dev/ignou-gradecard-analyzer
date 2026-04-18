import { Request, Response } from "express";
import { resultService } from "../services/result.service";
import { getCache, setCache } from "../utils/cache";

export const browserController = async (req: Request, res: Response) => {
  try {
    const {categoryType, program, enrollment } = req.body;

    if (!categoryType || !program || !enrollment) {
      return res
        .status(400)
        .json({ message: "Category, Program and Enrollment required" });
    }

    const cacheKey = `${categoryType}-${program.trim().toUpperCase()}-${enrollment.trim()}`;

    const cached = getCache(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }

    const result = await resultService(categoryType, program, enrollment );

    if (result.success) {
      const responseData = {
        message: "Grade Card fetched successfully",
        title: result.title,
        student: result.data?.student,
        grades: result.data?.grades,
        wrong_input: result.dialogMessage || null,

        subjectDetails: {
          percentage: result.subjectsDetails?.percentage,
          total_subject: result.subjectsDetails?.length,
          statusComplete: result.subjectsDetails?.statusComplete,
          statusIncomplete: result.subjectsDetails?.statusIncomplete,
        },
        raw_total: {
          totalTheoryMarks: result.raw_sums?.total_theory_marks,
          totalAssignmentMarks: result.raw_sums?.total_assignment_marks,
          totalPracticalMarks: result.raw_sums?.total_practical_marks,
        },
      };

      setCache(cacheKey, responseData);

      return res.status(200).json(responseData);
    } else {
      return res
        .status(404)
        .json({ message: result.message, wrong_input: result.message });
    }
  } catch (error) {
    console.error("Result Controller Error:", error);
    return res.status(500).json({ message: "Server Error!" });
  }
};
