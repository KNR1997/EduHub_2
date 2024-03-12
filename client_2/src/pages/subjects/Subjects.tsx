import { useState } from "react";
import "./page.scss";
import DataTable from "../../components/dataTable/DataTable";
import { useQuery } from "@tanstack/react-query";
import SubjectAddEdit from "./Subject.AddEdit";
import { SubjectInterface } from "../../interfaces/Entity.type";
import { columns } from "./columns";
import { Button } from "@mui/material";

export const Subjects = () => {
  const [open, setOpen] = useState(false);
  const [addEdit, setAddEdit] = useState<"add" | "edit">("add");
  const [editData, setEditData] = useState<SubjectInterface>(
    {} as SubjectInterface
  );

  // GET ALL SUBJECTS
  const { isLoading, data } = useQuery({
    queryKey: ["allSubjects"],
    queryFn: () =>
      fetch("https://localhost:7099/Subject").then((res) => res.json()),
  });

  const edit = (data: SubjectInterface) => {
    setOpen(true);
    setAddEdit("edit");
    setEditData(data);
  };

  const addNew = () => {
    setOpen(true);
    setAddEdit("add");
    setEditData({} as SubjectInterface);
  };

  return (
    <div className="products">
      <div className="info">
        <h1>Subjects</h1>
        <Button variant="contained" onClick={addNew}>
          Add New
        </Button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable
          slug="Subject"
          columns={columns}
          rows={data}
          editRow={edit}
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