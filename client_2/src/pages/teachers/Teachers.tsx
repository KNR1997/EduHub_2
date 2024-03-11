import { useState } from "react";
import "./page.scss";
import DataTable from "../../components/dataTable/DataTable";
import { useQuery } from "@tanstack/react-query";
import TeacherAddEdit from "./Teacher.AddEdit";
import { TeacherInterface } from "../../interfaces/Entity.type";
import { columns } from "./columns";

export const Teachers = () => {
  const [open, setOpen] = useState(false);
  const [addEdit, setAddEdit] = useState<"add" | "edit">("add");
  const [editData, setEditData] = useState<TeacherInterface>(
    {} as TeacherInterface
  );

  // TEST THE API
  const { isLoading, data } = useQuery({
    queryKey: ["allStudents"],
    queryFn: () =>
      fetch("https://localhost:7099/Teacher").then((res) => res.json()),
  });

  const editStudent = (data: TeacherInterface) => {
    setOpen(true);
    setAddEdit("edit");
    setEditData(data);
  };

  const addStudent = () => {
    setOpen(true);
    setAddEdit("add");
    setEditData({} as TeacherInterface);
  };

  return (
    <div className="products">
      <div className="info">
        <h1>Teachers</h1>
        <button onClick={addStudent}>Add New Teacher</button>
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
        <TeacherAddEdit
          slug="Student"
          columns={columns}
          setOpen={setOpen}
          addOrEdit={addEdit}
          data={editData}
        />
      )}
    </div>
  );
};