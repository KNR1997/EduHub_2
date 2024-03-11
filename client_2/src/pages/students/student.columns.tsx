import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
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
    {
      field: "age",
      type: "string",
      headerName: "Age",
      width: 100,
    },
    {
      field: "classroomName",
      type: "string",
      headerName: "Classroom",
      width: 100,
    },
];