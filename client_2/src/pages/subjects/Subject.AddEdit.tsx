import { GridColDef } from "@mui/x-data-grid";
import "./pageAddEdit.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { SubjectInterface } from "../../interfaces/Entity.type";
import { commonMutation } from "./api";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addOrEdit: "add" | "edit";
  data: SubjectInterface;
};

const SubjectAddEdit = (props: Props) => {

  // API Call for Subject Add/Edit
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: SubjectInterface) => {
      return commonMutation(
        `https://localhost:7099/Subject`,
        formData,
        props.addOrEdit === "edit"
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}s`]);
    },
  });

  const initialValues = {
    id: props.data.id || 0,
    name: props.data.name || ""
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is required")
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
      props.setOpen(false);
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>
          {props.addOrEdit === "add" ? "Add new " : "Edit "}
          {props.slug}
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="name"
            margin="normal"
            name="name"
            label="Subject"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default SubjectAddEdit;
