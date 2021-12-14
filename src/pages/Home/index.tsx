import React, { FC, useCallback, useState, useMemo } from "react";

import Layout from "../../components/Layout";
import Dialog from "../../components/Dialog";
import Highlight from "../../components/Highlight";
import InfiniteScroll from "../../components/InfiniteScroll";
import Table from "../../components/Table";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchStudents } from "../../redux/students";
import { Student } from "../../types";
import SearchInput from "./SearchInput";
import StudentDetails from "./StudentDetails";
import { showNotification } from "../../components/notifier";

const Home: FC = () => {
  const dispatch = useAppDispatch();

  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  const { students, loading, blocking, page, limit, total, searchTerm, error } =
    useAppSelector((state) => state.students);

  const fetchItems = useCallback(
    (nextPage: number, nextLimit: number) => {
      dispatch(
        fetchStudents({
          searchTerm: searchTerm || "",
          page: nextPage,
          limit: nextLimit,
        })
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  const handleRowClick = useCallback((item: Student) => {
    setCurrentStudent(item);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setCurrentStudent(null);
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "Student",
        cell: ({ avatarURL, name }: Student) => (
          <div className="user">
            <img className="avatar" src={avatarURL} alt="" />
            <span>
              <Highlight search={searchTerm || ""}>{name}</Highlight>
            </span>
          </div>
        ),
      },
      {
        header: "Lectures Attended",
        cell: ({ totalLectures, lecturesAttended }: Student) =>
          `${lecturesAttended.toString().padStart(2, "0")}/${totalLectures}`,
      },
    ],
    [searchTerm]
  );

  if (error) {
    showNotification(error, "error");
  }

  return (
    <Layout className="home" actions={<SearchInput />}>
      <InfiniteScroll
        blocking={blocking}
        loading={loading}
        items={students}
        fetchItems={fetchItems}
        total={total}
        page={page}
        limit={limit}
        noDataMessage="No Students Available"
      >
        {(items) => (
          <Table columns={columns} items={items} onRowClick={handleRowClick} />
        )}
      </InfiniteScroll>
      {currentStudent && (
        <Dialog
          title="Student Details"
          size="small"
          isOpen
          onRequestClose={handleCloseDialog}
        >
          <StudentDetails student={currentStudent} />
        </Dialog>
      )}
    </Layout>
  );
};

export default Home;
