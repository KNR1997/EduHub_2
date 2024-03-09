/* eslint-disable no-unused-vars */
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
import ClassroomModal from '../components/classrooms/ClassroomModal';
import ClassroomsTable from '../components/classrooms/ClassroomsTable';
import SubjectModal from '../components/subjects/SubjectModal';
import SubjectTable from '../components/subjects/SubjectTable';
import RiseLoader from "react-spinners/RiseLoader";
import { Audio } from 'react-loader-spinner'
import ClipLoader from "react-spinners/ClipLoader";
import { GiH2O } from 'react-icons/gi';


function SubjectsPage() {
    const [isModalOpen , setIsModalOpen] = useState(false);
    const [isDeleteConfirmationOpen , setIsDeleteConfirmationOpen ] = useState(false);
    const [deletingSubject , setdDeletingSubject] = useState(null);
    const [editingSubject , setEditingSubject] = useState(null);
    const { data:subjects , isLoading , error , fetchData } = useFetch("http://localhost:5251/api/Subjects");
    

    const data = useActionData()
 
    const navigate = useNavigate();

    useEffect(()=> {
        
        if((data && data.Message) && (data.Message == 'Subject Created' || data.Message == 'Subject Updated' || data.Message == 'Subject Deleted') ) 
        {
            console.log('data call');
            fetchData("http://localhost:5251/api/Subjects");
        }
        else{
            console.log('whatggs');
        }
    },[data,fetchData]);

    
    
  

    useEffect(()=> {
        
        if((data && data.Message) && (data.Message == 'Subject Created' || data.Message == 'Subject Updated' || data.Message == 'Subject Deleted')) 
        {
            if(data.Message == 'Subject Created' || data.Message == 'Subject Updated')
            {
                setIsModalOpen(false);
            }
            else if(data.Message == 'Subject Deleted')
            {
                setIsDeleteConfirmationOpen(false)
            }
            
        }
    },[data,navigate]);
    

    function handleAddSubject() {
        setIsModalOpen(true);
    }

    function closeModal() {
        if(editingSubject){
            setEditingSubject(null);
        }
        setIsModalOpen(false);
        
    }

    function handleEdit(data){
        setEditingSubject(data)
        setIsModalOpen(true);
    }

    function handleDelete(data) {
        console.log('dasa' , data);
        setdDeletingSubject(data.SubjectId);
        setIsDeleteConfirmationOpen(true);
        console.log('dek' , data);
    }

    function handleDeleteCancel(){
        setIsDeleteConfirmationOpen(false)
    }

  
    return (
        <>
         <div className='flex justify-between items-center'>
            <span className=' relative pb-1 after:content-[""] after:absolute after:left-0   after:bottom-0 after:border-[2px] after:rounded-2xl after:border-colorGreenDark after:w-[50%] text-xl'>Subjects</span>
            <Button onClick={() => {handleAddSubject()}} className='bg-colorGreenDark hidden lg:inline-block'>Add New Subject</Button>
            <Button onClick={() => {handleAddSubject()}} className='lg:hidden px-0 py-0' ><CiCirclePlus size={30} /></Button>
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
        {(!isLoading && subjects.length > 0) && <SubjectTable handleEdit={handleEdit} handleDelete={handleDelete} subjects={subjects}/>} 
         {isModalOpen && <SubjectModal editSubject={editingSubject ? editingSubject: null} closeModal={closeModal} />}
         {isDeleteConfirmationOpen && <DeleteConfirmation actionRoute="/subjects" recordId={deletingSubject} handleDeleteCancel={handleDeleteCancel} />}
        </>
    );
}

export default SubjectsPage;

export async function action({ request, params }) {
    
    const method = request.method;
    const formData = await request.formData();
  
    if(method == 'POST')
    {

        const subject = {
            subjectName: formData.get("subjectName"),  
          };

        try {
            const response = await axios.post("http://localhost:5251/api/subjects", subject);
            console.log(response.data);
            return response.data;
          } catch (error) {
            return error.response.data;
          }
    }
    else if(method == 'PUT')
    {

        const subject = {
            subjectName: formData.get("subjectName"),  
          };
     
        const subjectId = formData.get("editSubjectId");
        console.log('sdasd' , subjectId);
        try {
            const response = await axios.put(`http://localhost:5251/api/Subjects/${subjectId}`, subject);
            console.log(response.data);
            return response.data;
          } catch (error) {
            return error.response.data;
          }
    } else if(method == 'DELETE')
    {
        const subRecId = formData.get("delRecId");
        try {
            const response = await axios.delete(`http://localhost:5251/api/Subjects/${subRecId}`);
            console.log(response.data);
            return response.data;
          } catch (error) {
            return error.response.data;
          }
    }

  }