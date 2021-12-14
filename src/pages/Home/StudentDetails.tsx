import React, { FC } from 'react';

import { Student } from '../../types';

export interface StudentDetailsProps {
  student: Student;
}

const StudentDetails: FC<StudentDetailsProps> = ({ student }) => {
  return (
    <div className="student-details">
      <img className="avatar" src={student.avatarURL} alt="" />
      <h4>{student.name}</h4>
      <p className="detail">
        <span>Lectures Attended</span>
        <span>{`${student.lecturesAttended.toString().padStart(2, '0')}/${student.totalLectures}`}</span>
      </p>
      <div className="divider" />
      {student.marks && Object.entries(student.marks).map(([key, value]) => (
        <p key={key} className="detail">
          <span>{value?.subjectTitle}</span>
          <span>{`${value?.marksObtained.toString().padStart(2, '0')}/${value?.totalMarks}`}</span>
        </p>
      ))}
    </div>
  )
}

export default StudentDetails;
