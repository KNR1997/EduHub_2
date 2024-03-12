import "./single.scss";
import { Button, MenuItem, TextField } from "@mui/material";
import DataTable from "./DataTable";
import { columns } from "./columns";
import {
  SubjectInterface,
  TeacherInterface,
} from "../../interfaces/Entity.type";
import { useEffect, useState } from "react";
import { SubjectAllocateInterface } from "../../interfaces/Entity.type";
import { commonMutation } from "./api";

const StudentDetailReport = () => {
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState({});
  const [selectedClassroom, setSelectedClassroom] = useState({});
  const [allocatedClassrooms, setAllocatedClassrooms] = useState([]);

  useEffect(() => {
    fetchAllTeachers();
    fetchAllClassrooms();
  }, []);

  useEffect(() => {
    fetchAllocatedClassrooms();
  }, [selectedTeacher]);

  // Fetch all teachers
  const fetchAllTeachers = async () => {
    try {
      const response = await fetch("https://localhost:7099/Teacher");
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  // Fetch all subjects
  const fetchAllClassrooms = async () => {
    try {
      const response = await fetch("https://localhost:7099/Classroom");
      const data = await response.json();
      setClassrooms(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Fetch allocated classrooms for selecte teacher
  const fetchAllocatedClassrooms = async () => {
    try {
      const response = await fetch(
        `https://localhost:7099/AllocateClassrooms?teacherId=${selectedTeacher.id}`
      );
      const data = await response.json();
      setAllocatedClassrooms(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleTeacherChange = (event) => {
    const selectedTeacherValue = event.target.value;
    const selectedTeacherDetails = teachers.find(
      (teacher) => teacher.firstName === selectedTeacherValue
    );
    setSelectedTeacher(selectedTeacherDetails);
  };

  const handleSubjectChange = (event) => {
    const selectedClassroomValue = event.target.value;
    const selectedClassroomDetails = classrooms.find(
      (classroom) => classroom.name === selectedClassroomValue
    );
    setSelectedClassroom(selectedClassroomDetails);
  };

  const AllocateClassroom = async () => {
    if (selectedClassroom.id && selectedClassroom.id) {
      try {
        const response = await fetch(
          "https://localhost:7099/AllocateClassrooms",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              teacherId: selectedTeacher.id,
              classroomId: selectedClassroom.id,
            }),
          }
        );

        if (response.ok) {
          // Refresh the allocated subjects list after successful allocation
          fetchAllocatedClassrooms();
        } else {
          console.error("Failed to allocate subject:", response.statusText);
        }
      } catch (error) {
        console.error("Error allocating subject:", error);
      }
    } else {
      console.warn("Please select a teacher and a subject before allocating.");
    }
  };

  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="card">
            <div id="left">
              <div className="topInfo">
                <h3>Student</h3>
                <div className="dropdown">
                  <TextField
                    id="teacher"
                    select
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    name="teacher"
                    label="Teacher"
                    onChange={handleTeacherChange}
                  >
                    {teachers?.map((option: TeacherInterface) => (
                      <MenuItem key={option.firstName} value={option.firstName}>
                        {option.firstName}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>

              <div className="topInfo">
                <h3>Contact Pe.</h3>
                <div className="dropdown">
                  <TextField
                    id="subject"
                    fullWidth
                    disabled
                    margin="normal"
                    variant="outlined"
                    name="classroomName"
                    label="Subject"
                  ></TextField>
                </div>
              </div>

              <div className="topInfo">
                <h3>Contact No.</h3>
                <div className="dropdown">
                  <TextField
                    id="subject"
                    fullWidth
                    disabled
                    margin="normal"
                    variant="outlined"
                    name="classroomName"
                    label="Subject"
                  ></TextField>
                </div>
              </div>
            </div>
            <div id="right">
              <div className="topInfo">
                <h3>Classroom</h3>
                <div className="dropdown">
                  <TextField
                    id="subject"
                    fullWidth
                    disabled
                    margin="normal"
                    variant="outlined"
                    name="classroomName"
                    label="Subject"
                  ></TextField>
                </div>
              </div>

              <div className="topInfo">
                <h3>Email address</h3>
                <div className="dropdown">
                  <TextField
                    id="subject"
                    fullWidth
                    disabled
                    margin="normal"
                    variant="outlined"
                    name="classroomName"
                    label="Subject"
                  ></TextField>
                </div>
              </div>

              <div className="topInfo">
                <h3>Birthday</h3>
                <div className="dropdown">
                  <TextField
                    id="subject"
                    fullWidth
                    disabled
                    margin="normal"
                    variant="outlined"
                    name="classroomName"
                    label="Subject"
                  ></TextField>
                </div>
              </div>
            </div>
          </div>

          <div className="details">
            <h2>Subjects</h2>
          </div>
          <DataTable
            slug="AllocateSubjects"
            columns={columns}
            rows={allocatedClassrooms}
            selectedTeacher={selectedTeacher}
            // editRow={editStudent}
          />
        </div>
        <hr />
      </div>
    </div>
  );
};

export default StudentDetailReport;
