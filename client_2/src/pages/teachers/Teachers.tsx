import { useState } from "react";
import "./page.scss";
import DataTable from "../../components/dataTable/DataTable";
import { useQuery } from "@tanstack/react-query";
import TeacherAddEdit from "./Teacher.AddEdit";
import { TeacherInterface } from "../../interfaces/Entity.type";
import { columns } from "./columns";
import { Button } from "@mui/material";

export const Teachers = () => {
  const [open, setOpen] = useState(false);
  const [addEdit, setAddEdit] = useState<"add" | "edit">("add");
  const [teacher, setTeacher] = useState<TeacherInterface>(
    {} as TeacherInterface
  );

  // GET ALL TEACHERS
  const { isLoading, data } = useQuery({
    queryKey: ["allTeachers"],
    queryFn: () =>
      fetch("https://localhost:7099/Teacher").then((res) => res.json()),
  });

  const edit = (data: TeacherInterface) => {
    setOpen(true);
    setAddEdit("edit");
    setTeacher(data);
  };

  const addNew = () => {
    setOpen(true);
    setAddEdit("add");
    setTeacher({} as TeacherInterface);
  };

  return (
    <div className="products">
      <div className="info">
        <h1>Teachers</h1>
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
        <TeacherAddEdit
          slug="Student"
          columns={columns}
          setOpen={setOpen}
          addOrEdit={addEdit}
          data={teacher}
        />
      )}
    </div>
  );
};
