import { useState } from "react";
import "./page.scss";
import DataTable from "../../components/dataTable/DataTable";
import { useQuery } from "@tanstack/react-query";
import ClassroomAddEdit from "./ClassroomAddEdit";
import { ClassInterface } from "../../interfaces/Entity.type";
import { columns } from "./columns";
import { Button } from "@mui/material";

export const Classrooms = () => {
  const [open, setOpen] = useState(false);
  const [addEdit, setAddEdit] = useState<"add" | "edit">("add");
  const [classroom, setClassroom] = useState<ClassInterface>(
    {} as ClassInterface
  );

  // GET ALL CLASSROOMS
  const { isLoading, data } = useQuery({
    queryKey: ["allClassrooms"],
    queryFn: () =>
      fetch("https://localhost:7099/Classroom").then((res) => res.json()),
  });

  const edit = (data: ClassInterface) => {
    setOpen(true);
    setAddEdit("edit");
    setClassroom(data);
  };

  const addNew = () => {
    setOpen(true);
    setAddEdit("add");
    setClassroom({} as ClassInterface);
  };

  return (
    <div className="products">
      <div className="info">
        <h1>Classrooms</h1>
        <Button variant="contained" onClick={addNew}>
          Add New
        </Button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable
          slug="Classroom"
          columns={columns}
          rows={data}
          editRow={edit}
        />
      )}
      {open && (
        <ClassroomAddEdit
          slug="Classroom"
          columns={columns}
          setOpen={setOpen}
          addOrEdit={addEdit}
          data={classroom}
        />
      )}
    </div>
  );
};

export default Classrooms;
