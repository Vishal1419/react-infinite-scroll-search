import faker from "faker";

import { SubjectCodes, Student } from "../../types";

export const generateStudents = (): Student[] => new Array(100).fill(null).map(() => ({
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  avatarURL: `${faker.image.animals()}?random=${Date.now() + Math.random()}`,
  totalLectures: 30,
  lecturesAttended: Math.floor(Math.random() * (30 + 1)),
  marks: {
    [SubjectCodes.MTH101]: {
      subjectTitle: 'Introduction to mathematics',
      totalMarks: 100,
      marksObtained: Math.floor(Math.random() * (100 + 1)),
    },
    [SubjectCodes.ENG112]: {
      subjectTitle: 'English diagnostics',
      totalMarks: 100,
      marksObtained: Math.floor(Math.random() * (100 + 1)),
    }
  }
}));
