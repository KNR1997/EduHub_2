import { GridColDef } from "@mui/x-data-grid";
import "./studentAddEdit.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TextField } from "@mui/material";
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const StudentAddEdit = (props: Props) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    dob: '',
    classroomName: '',
    contactPerson: '',
  });

  const currencies = [
    {
      value: '5-A',
      label: '5-A',
    },
    {
      value: '5-B',
      label: '5-B',
    },
    {
      value: '5-C',
      label: '5-C',
    }
  ];

  // TEST THE API
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
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

  console.log(formData)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //add new item
    mutation.mutate();
    props.setOpen(false);
    console.log('Form data submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
            <TextField
              label="FirstName"
              variant="outlined"
              required
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="LastName"
              variant="outlined"
              required
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="ContactNo"
              variant="outlined"
              required
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              variant="outlined"
              required
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="ContactPerson"
              variant="outlined"
              required
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              id="outlined-select-classroomName"
              select
              name="classroomName"
              label="classroomName"
              onChange={handleChange}
              helperText="Please select classroom"
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
