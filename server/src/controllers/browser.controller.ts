import { Request, Response } from "express";
import { browserService } from "../services/browser.service";
import { getCache, setCache } from "../utils/cache";

export const browserController = async (req: Request, res: Response) => {
  try {
    const { program, enrollment } = req.body;

    if (!program || !enrollment) {
      return res
        .status(400)
        .json({ message: "Program and Enrollment required" });
    }

    const cacheKey = `${program.trim().toUpperCase()}-${enrollment.trim()}`;

    const cached = getCache(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }

    console.log(`Fetching: ${cacheKey}`);

    const result = await browserService(program, enrollment);

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
      return res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({ message: "Server Error!" });
  }
};
