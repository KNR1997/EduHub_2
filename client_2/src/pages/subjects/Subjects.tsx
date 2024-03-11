import { useState } from "react";
import "./page.scss";
import DataTable from "../../components/dataTable/DataTable";
import { useQuery } from "@tanstack/react-query";
import SubjectAddEdit from "./Subject.AddEdit";
import { SubjectInterface } from "../../interfaces/Entity.type";
import { columns } from "./columns";

export const Subjects = () => {
  const [open, setOpen] = useState(false);
  const [addEdit, setAddEdit] = useState<"add" | "edit">("add");
  const [editData, setEditData] = useState<SubjectInterface>(
    {} as SubjectInterface
  );

  // TEST THE API
  const { isLoading, data } = useQuery({
    queryKey: ["allStudents"],
    queryFn: () =>
      fetch("https://localhost:7099/Subject").then((res) => res.json()),
  });

  const editClassroom = (data: SubjectInterface) => {
    setOpen(true);
    setAddEdit("edit");
    setEditData(data);
  };

  const addClassroom = () => {
    setOpen(true);
    setAddEdit("add");
    setEditData({} as SubjectInterface);
  };

  return (
    <div className="products">
      <div className="info">
        <h1>Subjects</h1>
        <button onClick={addClassroom}>Add New Subject</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable
          slug="Subject"
          columns={columns}
          rows={data}
          editRow={editClassroom}
        />
      )}
      {open && (
        <SubjectAddEdit
          slug="Subject"
          columns={columns}
          setOpen={setOpen}
          addOrEdit={addEdit}
          data={editData}
        />
      )}
    </div>
  );
};

export default Subjects;