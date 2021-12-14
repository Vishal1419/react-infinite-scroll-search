import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Student } from "../../types";
import { StudentsState } from "./types";
import * as studentsRequests from "./requests";

const ENTITY = 'students';

const initialState: StudentsState = {
  students: [],
  searchTerm: '',
  total: null,
  limit: 20,
  page: 0,
  blocking: false,
  loading: false,
  error: '',
}

export const fetchStudents = createAsyncThunk<{ students: Student[]; total: number; }, { searchTerm?: string; page?: number; limit?: number; reset?: boolean }>(
  `${ENTITY}/fetchStudents`,
  async ({ searchTerm = '', page = 1, limit = 20, reset = false }) => {
    const skip = (page - 1) * limit;
    const { students, totalRecords } = await studentsRequests.fetchStudentsReq({ searchTerm, limit, skip });
    return { students, total: totalRecords };
  }
);

const slice = createSlice({
  name: ENTITY,
  initialState,
  reducers: {},
  extraReducers: (builders) => builders
    .addCase(fetchStudents.pending, (state, action) => {
      if (action.meta.arg.reset) {
        state.blocking = true;
      } else {
        state.loading = true;
      }
      state.error = '';
    })
    .addCase(fetchStudents.fulfilled, (state, action) => {
      if (action.meta.arg.reset) {
        state.students = action.payload.students;
        state.blocking = false;
      } else {
        state.students = [...state.students, ...action.payload.students];
        state.loading = false;
      }
      state.total = action.payload.total;
      state.limit = action.meta.arg.limit || 20;
      state.page = action.meta.arg.page || 1;
      state.searchTerm = action.meta.arg.searchTerm || '';
    })
    .addCase(fetchStudents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || '';
    })
});

export default slice.reducer;
