import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "name",
      type: "string",
      headerName: "ClassroomName",
      width: 200,
    }
];