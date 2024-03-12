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

const SubjectAllocate = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState({});
  const [selectedSubject, setSelectedSubject] = useState({});
  const [allocatedSubjects, setAllocatedSubjects] = useState([]);

  useEffect(() => {
    fetchAllTeachers();
    fetchAllSubjects();
  }, []);

  useEffect(() => {
    fetchAllocatedSubjects();
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
  const fetchAllSubjects = async () => {
    try {
      const response = await fetch("https://localhost:7099/Subject");
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Fetch allocated subjects for selecte teacher
  const fetchAllocatedSubjects = async () => {
    try {
      const response = await fetch(
        `https://localhost:7099/AllocateSubjects?teacherId=${selectedTeacher.id}`
      );
      const data = await response.json();
      setAllocatedSubjects(data);
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
    const selectedSubjectValue = event.target.value;
    const selectedSubjectDetails = subjects.find(
      (subject) => subject.name === selectedSubjectValue
    );
    setSelectedSubject(selectedSubjectDetails);
  };

  const AllocateSubject = async () => {
    if (selectedTeacher.id && selectedSubject.id) {
      try {
        const response = await fetch(
          "https://localhost:7099/AllocateSubjects",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              teacherId: selectedTeacher.id,
              subjectId: selectedSubject.id,
            }),
          }
        );

        if (response.ok) {
          // Refresh the allocated subjects list after successful allocation
          fetchAllocatedSubjects();
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
          <div className="topInfo">
            <h2>Teacher Details</h2>
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

            <Button variant="contained">Save</Button>
          </div>

          <div className="topInfo">
            <h2>Allocate Subjects</h2>
            <div className="dropdown">
              <TextField
                id="subject"
                select
                fullWidth
                margin="normal"
                variant="outlined"
                name="classroomName"
                label="Subject"
                onChange={handleSubjectChange}
              >
                {subjects?.map((option: SubjectInterface) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <Button variant="contained" onClick={AllocateSubject}>Allocate</Button>
          </div>
          <div className="details">
            <h2>Subjects</h2>
          </div>
          <DataTable
            slug="AllocateSubjects"
            columns={columns}
            rows={allocatedSubjects}
            selectedTeacher={selectedTeacher}
            // editRow={editStudent}
          />
        </div>
        <hr />
      </div>
    </div>
  );
};

export default SubjectAllocate;
