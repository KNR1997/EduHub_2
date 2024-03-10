import { useState } from "react";
import "./students.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../data";
import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    type: "string",
    headerName: "FirstName",
    width: 100,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "LastName",
    width: 100,
  },
  {
    field: "contactPerson",
    type: "string",
    headerName: "ContactPerson",
    width: 200,
  },
  {
    field: "contactNo",
    type: "string",
    headerName: "ContactNo",
    width: 200,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 250,
  },
  {
    field: "inStock",
    type: "date",
    headerName: "Birthday",
    width: 100,
  },
];

const Students = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allStudents"],
    queryFn: () =>
      fetch("https://localhost:7099/Student").then(
        (res) => res.json()
      ),
  });

  console.log('students: ', data)

  return (
    <div className="products">
      <div className="info">
        <h1>Students</h1>
        <button onClick={() => setOpen(true)}>Add New Student</button>
      </div>
      {/* <DataTable slug="products" columns={columns} rows={products} /> */}
      {/* TEST THE API */}

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )}
      {open && <Add slug="student" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Students;
