/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback } from 'react';
import Button from '../components/button/Button';
import { CiCirclePlus } from "react-icons/ci";
import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import { useActionData ,useNavigate} from 'react-router-dom'
import DeleteConfirmation from '../components/delete/deleteConfirmation';
import ClassroomModal from '../components/classrooms/ClassroomModal';
import ClassroomsTable from '../components/classrooms/ClassroomsTable';
import RiseLoader from "react-spinners/RiseLoader";

function ClassroomPage(props) {
    const [isModalOpen , setIsModalOpen] = useState(false);
    const [isDeleteConfirmationOpen , setIsDeleteConfirmationOpen ] = useState(false);
    const [deletingClassroom , setdDeletingClassroom] = useState(null);
    const [editingClassroom , setEditingClassroom] = useState(null);
    const { data:classrooms , isLoading , error , fetchData } = useFetch("http://localhost:5251/api/Classrooms");

    const data = useActionData()
 
    const navigate = useNavigate();

    useEffect(()=> {
        
        if((data && data.Message) && (data.Message == 'Classroom Created' || data.Message == 'Classroom Updated' || data.Message == 'Classroom Deleted') ) 
        {
            console.log('data call');
            fetchData("http://localhost:5251/api/Classrooms");
        }
        else{
            console.log('whatggs');
        }
    },[data,fetchData]);

    
    
  

    useEffect(()=> {
        
        if((data && data.Message) && (data.Message == 'Classroom Created' || data.Message == 'Classroom Updated' || data.Message == 'Classroom Deleted')) 
        {
            if(data.Message == 'Classroom Created' || data.Message == 'Classroom Updated')
            {
                setIsModalOpen(false);
            }
            else if(data.Message == 'Classroom Deleted')
            {
                setIsDeleteConfirmationOpen(false)
            }
            
        }
    },[data,navigate]);
    

    function handleAddClassroom() {
        setIsModalOpen(true);
    }

    function closeModal() {
        if(editingClassroom){
            setEditingClassroom(null);
        }
        setIsModalOpen(false);
        
    }

    function handleEdit(data){
        setEditingClassroom(data)
        setIsModalOpen(true);
    }

    function handleDelete(data) {
        console.log('dasa' , data);
        setdDeletingClassroom(data.ClassroomId);
        setIsDeleteConfirmationOpen(true);
        console.log('dek' , data);
    }

    function handleDeleteCancel(){
        setIsDeleteConfirmationOpen(false)
    }

    return (
        <>
         <div className='flex justify-between items-center'>
            <span className=' relative pb-1 after:content-[""] after:absolute after:left-0   after:bottom-0 after:border-[2px] after:rounded-2xl after:border-colorGreenDark after:w-[50%] text-xl'>Classrooms</span>
            <Button onClick={() => {handleAddClassroom()}} className='bg-colorGreenDark hidden lg:inline-block'>Add New Classroom</Button>
            <Button onClick={() => {handleAddClassroom()}} className='lg:hidden px-0 py-0' ><CiCirclePlus size={30} /></Button>
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
          {classrooms.length > 0 && <ClassroomsTable handleEdit={handleEdit} handleDelete={handleDelete} classrooms={classrooms}/>} 
         {isModalOpen && <ClassroomModal editClassroom={editingClassroom ? editingClassroom: null} closeModal={closeModal} />}
         {isDeleteConfirmationOpen && <DeleteConfirmation actionRoute="/classrooms" recordId={deletingClassroom} handleDeleteCancel={handleDeleteCancel} />}
        </>
    );
}

export default ClassroomPage;

export async function action({ request, params }) {
    
    const method = request.method;
    const formData = await request.formData();
  
    if(method == 'POST')
    {

        const classroom = {
            className: formData.get("className"),  
          };

        try {
            const response = await axios.post("http://localhost:5251/api/Classrooms", classroom);
            console.log(response.data);
            return response.data;
          } catch (error) {
            return error.response.data;
          }
    }
    else if(method == 'PUT')
    {
        const classroom = {
            className: formData.get("className"),  
          };
        const classroomId = formData.get("editClassroomId");
        console.log('sasda' , classroomId);
        try {
            const response = await axios.put(`http://localhost:5251/api/Classrooms/${classroomId}`, classroom);
            console.log(response.data);
            return response.data;
          } catch (error) {
            return error.response.data;
          }
    } else if(method == 'DELETE')
    {
        const classRecId = formData.get("delRecId");
        console.log('delid' + classRecId);
        try {
            const response = await axios.delete(`http://localhost:5251/api/Classrooms/${classRecId}`);
            console.log(response.data);
            return response.data;
          } catch (error) {
            return error.response.data;
          }
    }

  }