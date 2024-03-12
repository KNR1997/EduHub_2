import { useState } from "react";
import "./page.scss";
import DataTable from "../../components/dataTable/DataTable";
import { useQuery } from "@tanstack/react-query";
import StudentAddEdit from "./StudentAddEdit";
import { StudentInterface } from "../../interfaces/Entity.type";
import { columns } from "./columns";
import { Button } from "@mui/material";

const Students = () => {
  const [open, setOpen] = useState(false);
  const [addEdit, setAddEdit] = useState<"add" | "edit">("add");
  const [student, setStudent] = useState<StudentInterface>(
    {} as StudentInterface
  );

  // GET ALL STUDENTS
  const { isLoading, data } = useQuery({
    queryKey: ["allStudents"],
    queryFn: () =>
      fetch("https://localhost:7099/Student").then((res) => res.json()),
  });

  const edit = (data: StudentInterface) => {
    setOpen(true);
    setAddEdit("edit");
    setStudent(data);
  };

  const addNew = () => {
    setOpen(true);
    setAddEdit("add");
    setStudent({} as StudentInterface);
  };

  return (
    <div className="products">
      <div className="info">
        <h1>Students</h1>
        <Button variant="contained" onClick={addNew}>
          Add New
        </Button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable
          slug="Student"
          columns={columns}
          rows={data}
          editRow={edit}
        />
      )}

      {open && (
        <StudentAddEdit
          slug="Student"
          columns={columns}
          setOpen={setOpen}
          addOrEdit={addEdit}
          data={student}
        />
      )}
    </div>
  );
};

export default Students;
