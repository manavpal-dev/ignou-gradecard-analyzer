export interface Student {
  name: string;
  enrollment: string;
  program: string;
}

export interface Grade {
  Course: string;
  Assignment: number | null;
  Theory: number | null;
  Practical: number | null;
  Status: string;
}

export interface GradeCardResponse {
  message: string;
  student: Student;
  grades: Grade[];
  percentage: number;
  total_subject: number;
}