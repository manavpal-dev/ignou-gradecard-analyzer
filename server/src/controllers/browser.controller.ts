import { Request, Response } from "express";
import { browserService } from "../services/browser.service";

export const browserController = async (req: Request, res: Response) => {
  try {
    const { program, enrollment } = req.body;

    if (!program || !enrollment) {
      return res
        .status(400)
        .json({ message: "Program and Enrollment required" });
    }
    const result = await browserService(program, enrollment);

    if (result.success) {
      return res.status(200).json({
        message: "Grade Card fetched successfully",
        title: result.title,
        student: result.data?.student,
        grades: result.data?.grades,
        percentage: result.percentage,
        total_subject: result.length,
        wrong_input: result.dialogMessage || null
      });
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({ message: "Server Error!" });
  }
};
