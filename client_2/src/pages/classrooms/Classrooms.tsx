import { useState } from "react";
import "./page.scss";
import DataTable from "../../components/dataTable/DataTable";
import { useQuery } from "@tanstack/react-query";
import ClassroomAddEdit from "./ClassroomAddEdit";
import { ClassInterface } from "../../interfaces/Entity.type";
import { columns } from "./columns";

export const Classrooms = () => {
  const [open, setOpen] = useState(false);
  const [addEdit, setAddEdit] = useState<"add" | "edit">("add");
  const [classroom, setClassroom] = useState<ClassInterface>(
    {} as ClassInterface
  );

  // TEST THE API
  const { isLoading, data } = useQuery({
    queryKey: ["allStudents"],
    queryFn: () =>
      fetch("https://localhost:7099/Classroom").then((res) => res.json()),
  });

  const editClassroom = (data: ClassInterface) => {
    setOpen(true);
    setAddEdit("edit");
    setClassroom(data);
  };

  const addClassroom = () => {
    setOpen(true);
    setAddEdit("add");
    setClassroom({} as ClassInterface);
  };

  return (
    <div className="products">
      <div className="info">
        <h1>Classrooms</h1>
        <button onClick={addClassroom}>Add New Classroom</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable
          slug="Classroom"
          columns={columns}
          rows={data}
          editRow={editClassroom}
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