import { GridColDef } from "@mui/x-data-grid";
import "./studentAddEdit.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import * as yup from "yup";
import { StudentInterface, ClassInterface } from "../../interfaces/Entity.type";
import { commonMutation } from "./api";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addOrEdit: "add" | "edit";
  data: StudentInterface;
};

const StudentAddEdit = (props: Props) => {
  // Fetch all classes
  const { data: classes } = useQuery(["allClasses"], async () => {
    const response = await fetch("https://localhost:7099/Classroom");
    if (!response.ok) {
      throw new Error("Failed to fetch classes");
    }
    return response.json();
  });

  // API Call for Student Add/Edit
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: StudentInterface) => {
      return commonMutation(
        `https://localhost:7099/Student`,
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
    contactNo: props.data.contactNo || "",
    dob: props.data.dob || "",
    classroomName: props.data.classroomName || "",
    contactPerson: props.data.contactPerson || "",
  };

  const validationSchema = yup.object({
    firstName: yup.string().required("FirstName is required"),
    lastName: yup.string().required("LastName is required"),
    email: yup.string().email().required("Email is required"),
    contactNo: yup.number().required("Contact Number is required"),
    dob: yup.date().required("Birthday is required"),
    contactPerson: yup.string().required("Contact Person is required"),
    classroomName: yup.string().required("Classroom Name is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Convert dob to the required format
      const dobDate = new Date(values.dob);
      const formattedDob = dobDate.toISOString();

      // Update the values with the formatted dob
      const updatedValues = { ...values, dob: formattedDob };

      mutation.mutate(updatedValues);
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
          {props.addOrEdit ? "Edit " : "Add new"}
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
          <TextField
            id="dob"
            margin="normal"
            name="dob"
            label="Birthday"
            variant="outlined"
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dob && Boolean(formik.errors.dob)}
            helperText={formik.touched.dob && formik.errors.dob}
          />
          <TextField
            id="contactPerson"
            margin="normal"
            name="contactPerson"
            label="Contact Person"
            variant="outlined"
            value={formik.values.contactPerson}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.contactPerson &&
              Boolean(formik.errors.contactPerson)
            }
            helperText={
              formik.touched.contactPerson && formik.errors.contactPerson
            }
          />
          <TextField
            id="classroomName"
            select
            margin="normal"
            variant="outlined"
            name="classroomName"
            label="classroomName"
            value={formik.values.classroomName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.classroomName &&
              Boolean(formik.errors.classroomName)
            }
            helperText={
              formik.touched.classroomName && formik.errors.classroomName
            }
          >
            {classes?.map((option: ClassInterface) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default StudentAddEdit;
