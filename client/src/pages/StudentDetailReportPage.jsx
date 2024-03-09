/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import StudentDetailReportTable from '../components/StudentDetailReportPage/StudentDetailReportTable';
import RiseLoader from "react-spinners/RiseLoader";

function StudentDetailReportPage(props) {
    const { data:students , isLoading , error , fetchData } = useFetch("http://localhost:5251/api/studentDetailReport");
    const [studentDetails , setStudentDetails] = useState({
        classroom : '',
        contactPerson : '',
        email : '',
        contactNo : '',
        dob : '',
        otherDetails : []
    })
    
    console.log(studentDetails);

    async function handleSelect(e){
        const id = e.target.value ;

        try {
            const response = await axios.get(`http://localhost:5251/api/studentDetailReport/${id}`);
            setStudentDetails(prevDetails => {
                let newDetails = {...prevDetails};
                newDetails.classroom = response.data[0].ClassName;
                newDetails.contactNo = response.data[0].ContactNo;
                newDetails.contactPerson = response.data[0].ContactPerson;
                newDetails.dob = response.data[0].DateOfBirth;
                newDetails.email = response.data[0].EmailAddress;
                newDetails.otherDetails = response.data.slice(1)
                return newDetails;
            })
        } catch (error) {
            console.log('err' ,error);
        }
    }
    return (
        <>
        <div className='flex justify-between items-center'>
            <span className=' relative pb-1 after:content-[""] after:absolute after:left-0   after:bottom-0 after:border-[2px] after:rounded-2xl after:border-colorGreenDark after:w-[50%] text-xl'>Student Report</span>
        </div>
        <div className=' mt-5 mb-10 grid grid-cols-3 gap-5'>
            <div className='flex flex-col'>
                <h2 className='text-sm'>Student :</h2>
            <select name="students" onChange={(e) => {handleSelect(e)}} className="text-sm rounded-md caret-accent-blue-500 focus:outline-none focus:border-accent-blue-500  py-2 pl-8"     >
                <option disabled={true} >Select a Student</option>
                {students.map(student => (
                    <option key={student.StudentId} value={student.StudentId}  >{student.Name}</option>
                ))}
            </select>
            </div>

            <div className='flex flex-col'>
                <h2 className='text-sm'>Classroom :</h2>
                <input name="classroom" value={studentDetails.classroom} readOnly className="text-sm rounded-md caret-accent-blue-500 focus:outline-none focus:border-accent-blue-500  py-2 pl-8"     />
            </div>

            <div className='flex flex-col'>
                <h2 className='text-sm'>Contact Person :</h2>
                <input name="classroom" value={studentDetails.contactPerson} readOnly className="text-sm rounded-md caret-accent-blue-500 focus:outline-none focus:border-accent-blue-500  py-2 pl-8"     />
            </div>

            <div className='flex flex-col'>
                <h2 className='text-sm'>Email :</h2>
                <input name="classroom" value={studentDetails.email} readOnly className="text-sm rounded-md caret-accent-blue-500 focus:outline-none focus:border-accent-blue-500  py-2 pl-8"     />
            </div>

            <div className='flex flex-col'>
                <h2 className='text-sm'>Contact No :</h2>
                <input name="classroom" value={studentDetails.contactNo} readOnly className="text-sm rounded-md caret-accent-blue-500 focus:outline-none focus:border-accent-blue-500  py-2 pl-8"     />
            </div>

            <div className='flex flex-col'>
                <h2 className='text-sm'>Date of Birth :</h2>
                <input name="classroom" value={studentDetails.dob} readOnly className="text-sm rounded-md caret-accent-blue-500 focus:outline-none focus:border-accent-blue-500  py-2 pl-8"     />
            </div>
        
        </div>
        
        <div className='flex justify-between items-center'>
            <span className=' relative pb-1 after:content-[""] after:absolute after:left-0   after:bottom-0 after:border-[2px] after:rounded-2xl after:border-colorGreenDark after:w-[50%] text-xl'>Teacher and subject details</span>
        </div>

        {
            isLoading ? 
            <div className=' flex justify-center h-[calc(100%-20rem)] items-center'>
            <RiseLoader
            color={'#FFF'}
            loading={isLoading}
            
            size={6}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
            </div>
             : ''
        
         }
         {(!isLoading && error) &&<div className='flex justify-center h-[calc(100%-20rem)] items-center'><h2>Error Occured</h2></div> }
        {studentDetails.otherDetails.length > 0 && <StudentDetailReportTable  subjectsAndTeachers={studentDetails.otherDetails}/>}
        </>
         
    );
}

export default StudentDetailReportPage;