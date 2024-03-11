import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { StudentInterface, ClassInterface } from "../../interfaces/Entity.type";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  editRow: (data: StudentInterface | ClassInterface) => void;
};

const DataTable = (props: Props) => {
  const [dialogBox, openDialogBox] = useState(false);
  const [paramId, setParamId] = useState<number>(0);

  // TEST THE API
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => {
      let annotation = props.slug.toLowerCase();
      return fetch(`https://localhost:7099/${props.slug}?${annotation}Id=${id}`, {
        method: "delete",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}`]);
    },
  });

  const handleDelete = () => {
    openDialogBox(false);

    mutation.mutate(paramId)
  };

  const handleEdit = (params: GridCellParams) => {
    props.editRow(params.row);
  };

  const handleDeleteClick = (params: GridCellParams) => {
    openDialogBox(true);
    setParamId(params.row.id)
  };

  const closeDialogBox = () => {
    openDialogBox(false);
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <button onClick={() => handleEdit(params)}>
            <img src="/view.svg" alt="" />
          </button>
          <button onClick={() => handleDeleteClick(params)}>
            <img src="/delete.svg" alt="" />
          </button>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
      <Dialog
        open={dialogBox}
        onClose={closeDialogBox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Action"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to do this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogBox} variant="outlined">No</Button>
          <Button onClick={handleDelete} autoFocus variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;
