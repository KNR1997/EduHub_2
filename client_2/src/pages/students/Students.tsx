import { useState } from "react";
import "./students.scss";
import DataTable from "../../components/dataTable/DataTable";
import { useQuery } from "@tanstack/react-query";
import StudentAddEdit from "./StudentAddEdit";
import { StudentInterface } from "../../interfaces/Entity.type";
import { columns } from "./student.columns";

const Students = () => {
  const [open, setOpen] = useState(false);
  const [addEdit, setAddEdit] = useState<"add" | "edit">("add");
  const [Student, setStudent] = useState<StudentInterface>(
    {} as StudentInterface
  );

  // TEST THE API
  const { isLoading, data } = useQuery({
    queryKey: ["allStudents"],
    queryFn: () =>
      fetch("https://localhost:7099/Student").then((res) => res.json()),
  });

  const editStudent = (data: StudentInterface) => {
    setOpen(true);
    setAddEdit("edit");
    setStudent(data);
  };

  const addStudent = () => {
    setOpen(true);
    setAddEdit("add");
    setStudent({} as StudentInterface);
  };

  return (
    <div className="products">
      <div className="info">
        <h1>Students</h1>
        <button onClick={addStudent}>Add New Student</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable
          slug="Student"
          columns={columns}
          rows={data}
          editRow={editStudent}
        />
      )}
      {open && (
        <StudentAddEdit
          slug="Student"
          columns={columns}
          setOpen={setOpen}
          addOrEdit={addEdit}
          data={Student}
        />
      )}
    </div>
  );
};

export default Students;
