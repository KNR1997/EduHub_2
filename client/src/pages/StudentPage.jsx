/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback } from 'react';
import StudentsTable from '../components/students/StudentsTable';
import Button from '../components/button/Button';
import { CiCirclePlus } from "react-icons/ci";
import StudentModal from '../components/students/StudentModal';
import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import {Form ,useNavigation ,useActionData ,useNavigate ,redirect} from 'react-router-dom'
import DeleteConfirmation from '../components/delete/deleteConfirmation';
import RiseLoader from "react-spinners/RiseLoader";

function StudentPage(props) {

    const [isModalOpen , setIsModalOpen] = useState(false);
    const [isDeleteConfirmationOpen , setIsDeleteConfirmationOpen ] = useState(false);
    const [deletingStudent , setdDeletingStudent] = useState(null);
    const [editingStudent , setEditingStudent] = useState(null);
    const { data:students , isLoading , error , fetchData } = useFetch("https://localhost:7099/Student");

    const data = useActionData()
 
    const navigate = useNavigate();

    useEffect(()=> {
        
        if((data && data.Message) && (data.Message == 'Student Created' || data.Message == 'Student Updated' || data.Message == 'Student Deleted') ) 
        {
            console.log('data call');
            fetchData("https://localhost:7099/Student");
        }
        else{
            console.log('whatggs');
        }
    },[data,fetchData]);

    
    
  

    useEffect(()=> {
        
        if((data && data.Message) && (data.Message == 'Student Created' || data.Message == 'Student Updated' || data.Message == 'Student Deleted')) 
        {
            if(data.Message == 'Student Created' || data.Message == 'Student Updated')
            {
                setIsModalOpen(false);
            }
            else if(data.Message == 'Student Deleted')
            {
                setIsDeleteConfirmationOpen(false)
            }
            
        }
    },[data,navigate]);
    

    function handleAddStudent() {
        setIsModalOpen(true);
    }

    function closeModal() {
        if(editingStudent){
            setEditingStudent(null);
        }
        setIsModalOpen(false);
        
    }

    function handleEdit(data){
        setEditingStudent(data)
        setIsModalOpen(true);
    }

    function handleDelete(data) {
        setdDeletingStudent(data.StudentId);
        setIsDeleteConfirmationOpen(true);
        console.log('dek' , data);
    }

    function handleDeleteCancel(){
        setIsDeleteConfirmationOpen(false)
    }


    return (
        <>
         <div className='flex justify-between items-center'>
            <span className=' relative pb-1 after:content-[""] after:absolute after:left-0   after:bottom-0 after:border-[2px] after:rounded-2xl after:border-colorGreenDark after:w-[50%] text-xl'>Students</span>
            <Button onClick={() => {handleAddStudent()}} className='bg-colorGreenDark hidden lg:inline-block'>Add New Student</Button>
            <Button onClick={() => {handleAddStudent()}} className='lg:hidden px-0 py-0' ><CiCirclePlus size={30} /></Button>
         </div>
         {
            isLoading ? 
            <div className='flex justify-center h-[calc(100%-3rem)] items-center'>
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
         {(!isLoading && error) &&<div className='flex justify-center h-[calc(100%-3rem)] items-center'><h2>Error Occured</h2></div> }
          {students.length > 0 && <StudentsTable handleEdit={handleEdit} handleDelete={handleDelete} students={students}/>} 
         {isModalOpen && <StudentModal editStudent={editingStudent ? editingStudent : null} closeModal={closeModal} />}
         {isDeleteConfirmationOpen && <DeleteConfirmation actionRoute="/students" recordId={deletingStudent} handleDeleteCancel={handleDeleteCancel} />}
        </>
       
    );
}

export default StudentPage;

export async function action({ request, params }) {
    
    const method = request.method;
    const formData = await request.formData();
  
    if(method == 'POST')
    {
        const birthdateString = formData.get("dob");
    const birthdate = new Date(birthdateString);
    const currentDate = new Date();
    const studentAge = currentDate.getFullYear() - birthdate.getFullYear();

        const student = {
            firstName: formData.get("first-name"),
            lastName: formData.get("last-name"),
            emailAddress: formData.get("email"),
            dateOfBirth: birthdateString,
            age : studentAge,
            contactPerson: formData.get("contact-person"),
            contactNo: formData.get("contact-number"),
            classroomId: formData.get("classroom"),
          };

        try {
            const response = await axios.post("http://localhost:5251/api/Students", student);
            console.log(response.data);
            return response.data;
          } catch (error) {
            return error.response.data;
          }
    }
    else if(method == 'PUT')
    {
        const birthdateString = formData.get("dob");
    const birthdate = new Date(birthdateString);
    const currentDate = new Date();
    const studentAge = currentDate.getFullYear() - birthdate.getFullYear();

        const student = {
            firstName: formData.get("first-name"),
            lastName: formData.get("last-name"),
            emailAddress: formData.get("email"),
            dateOfBirth: birthdateString,
            age : studentAge,
            contactPerson: formData.get("contact-person"),
            contactNo: formData.get("contact-number"),
            classroomId: formData.get("classroom"),
          };
        const studentId = formData.get("editStuId");
        try {
            const response = await axios.put(`http://localhost:5251/api/Students/${studentId}`, student);
            console.log(response.data);
            return response.data;
          } catch (error) {
            return error.response.data;
          }
    } else if(method == 'DELETE')
    {
        const studentId = formData.get("delRecId");
        try {
            const response = await axios.delete(`http://localhost:5251/api/Students/${studentId}`);
            console.log(response.data);
            return response.data;
          } catch (error) {
            return error.response.data;
          }
    }

  }