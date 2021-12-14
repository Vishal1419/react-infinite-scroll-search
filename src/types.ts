export enum SubjectCodes {
  MTH101 = "mth101",
  ENG112 = "eng112",
}

export interface Student {
  name: string;
  avatarURL: string;
  lecturesAttended: number;
  totalLectures: number;
  marks: Partial<Record<SubjectCodes, { subjectTitle: string; totalMarks: number; marksObtained: number; }>>;
}
