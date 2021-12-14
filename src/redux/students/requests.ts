import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {
  convertParamsToRequestParams,
  convertRequestParamsToParams,
} from "../utils";
import { FetchStudents } from "./types";
import { generateStudents } from "./mock-data";

const students = generateStudents();
const mock = new MockAdapter(axios, { delayResponse: 1000 });

export const fetchStudentsReq = async (params: typeof FetchStudents.Params) => {
  mock.onGet(/\/students.*/).reply((config) => {
    const paramsObj = convertRequestParamsToParams(
      config.url?.split("?")[1] || ""
    );
    const searchTerm: string = paramsObj.searchTerm || "";
    const skip: number = +paramsObj.skip || 0;
    const limit: number = +paramsObj.limit || 20;

    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const result = filteredStudents.slice(skip, skip + limit);
    return [
      200,
      { data: { students: result, totalRecords: filteredStudents.length } },
    ];
  });

  const requestParams = convertParamsToRequestParams(params);
  const res = await axios.get<typeof FetchStudents.Res>(
    `${FetchStudents.ROUTE}${requestParams ? `?${requestParams}` : ""}`
  );
  return res.data.data;

  // await new Promise(resolve => setTimeout(resolve, 500))

  // return {
  //   totalRecords: students.length,
  //   students: students.slice(params.skip, params.skip! + params.limit!),
  // };
};
