import { GridColDef } from "@mui/x-data-grid";
import "./studentAddEdit.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import * as yup from "yup";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const StudentAddEdit = (props: Props) => {
  const currencies = [
    {
      value: "5-A",
      label: "5-A",
    },
    {
      value: "5-B",
      label: "5-B",
    },
    {
      value: "5-C",
      label: "5-C",
    },
  ];

  // TEST THE API
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: {
      firstName: string;
      lastName: string;
      email: string;
      contactNo: string;
      dob: string;
      classroomName: string;
      contactPerson: string;
    }) => {
      return fetch(`https://localhost:7099/Student`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}s`]);
    },
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    dob: "",
    classroomName: "",
    contactPerson: "",
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
        <h1>Add new {props.slug}</h1>
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
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
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
