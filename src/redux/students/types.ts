import { Student } from "../../types";
import { requestType } from "../utils";

export interface StudentsState {
  students: Student[];
  searchTerm: string | null;
  total: number | null;
  limit: number;
  page: number;
  blocking: boolean;
  loading: boolean;
  error: string;
}

export class FetchStudents {
  static TYPE: requestType = 'GET';
  static ROUTE = '/students';
  static Params: {
    searchTerm?: string;
    limit?: number;
    skip?: number;
  }
  static Res: {
    data: {
      totalRecords: number;
      students: Student[];
    };
  };
}
