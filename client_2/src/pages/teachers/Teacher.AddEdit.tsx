import { GridColDef } from "@mui/x-data-grid";
import "./pageAddEdit.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { StudentInterface, TeacherInterface } from "../../interfaces/Entity.type";
import { commonMutation } from "./api";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addOrEdit: "add" | "edit";
  data: StudentInterface;
};

const TeacherAddEdit = (props: Props) => {

  // API Call for Student Add/Edit
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: TeacherInterface) => {
      return commonMutation(
        `https://localhost:7099/Teacher`,
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
    firstName: props.data.firstName || "",
    lastName: props.data.lastName || "",
    email: props.data.email || "",
    contactNo: props.data.contactNo || ""
  };

  const validationSchema = yup.object({
    firstName: yup.string().required("FirstName is required"),
    lastName: yup.string().required("LastName is required"),
    email: yup.string().email().required("Email is required"),
    contactNo: yup.number().required("Contact Number is required"),
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
          {props.addOrEdit === "edit" ? "Edit " : "Add new"}
          {props.slug}
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="firstName"
            margin="normal"
            name="firstName"
            label="FirstName"
            variant="outlined"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            id="lastName"
            margin="normal"
            name="lastName"
            label="LastName"
            variant="outlined"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            id="email"
            margin="normal"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="contactNo"
            margin="normal"
            name="contactNo"
            label="ContactNo"
            variant="outlined"
            value={formik.values.contactNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.contactNo && Boolean(formik.errors.contactNo)}
            helperText={formik.touched.contactNo && formik.errors.contactNo}
          />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default TeacherAddEdit;