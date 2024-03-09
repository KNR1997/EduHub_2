/* eslint-disable no-unused-vars */
import React from 'react';
import useFetch from '../hooks/useFetch';
import { Form } from 'react-router-dom';
import Button from '../components/button/Button';
import axios from 'axios';
import AllocateSubjectsTable from '../components/allocateSubjects/allocateSubjectsTable';
import { useState , useEffect } from 'react';
import {useNavigation ,useActionData ,useNavigate ,redirect} from 'react-router-dom'
import DeleteConfirmation from '../components/delete/deleteConfirmation';
import AllocateClassroomTable from '../components/allocateClassroomTable/AllocateClassroomTable';
import RiseLoader from "react-spinners/RiseLoader";

function AllocateClassroomsPage(props) {
    const { data:teachers , isLoading:isLoadingTeachers , error:errorTeachers } = useFetch("http://localhost:5251/api/Teachers");
    const { data:classrooms , isLoading:isLoadingClassrooms , error:errorClassrooms} = useFetch("http://localhost:5251/api/Classrooms");
    const { data:allocateClassrooms , isLoading:isLoadingallocateClassrooms , error ,fetchData } = useFetch("http://localhost:5251/api/AllocateClassrooms");
    const [isDeleteConfirmationOpen , setIsDeleteConfirmationOpen ] = useState(false);
    const [deletingAllocatedSubject, setdDeletingAllocatedSubject] = useState(null);

    const data = useActionData()
 
    const navigate = useNavigate();

    useEffect(()=> {
        
        if((data && data.Message) && (data.Message == 'AllocateClassroom Created' || data.Message == 'AllocateClassroom Deleted') ) 
        {
            console.log('data call');
            fetchData("http://localhost:5251/api/AllocateClassrooms");
        }

    },[data,fetchData]);

    useEffect(()=> {
        
        if((data && data.Message) && (data.Message == 'AllocateClassroom Deleted')) 
        {
            
                setIsDeleteConfirmationOpen(false)
            
            
        }
    },[data,navigate]);

    function handleDelete(data) {
        console.log('dasa' , data);
        setdDeletingAllocatedSubject(data.AllocateClassroomId);
        setIsDeleteConfirmationOpen(true);
        console.log('dek' , data);
    }

    function handleDeleteCancel(){
        setIsDeleteConfirmationOpen(false)
    }
    return (
        <>
        <div className='flex justify-center items-center'>
           <span className=' relative pb-1 after:content-[""] after:absolute after:left-10   after:bottom-0 after:border-[2px] after:rounded-2xl after:border-colorGreenDark after:w-[50%] text-xl'>Allocate Classrooms</span>
        </div>
        
         <Form
         method="post"
         action="/allocateClassrooms"
         
         >
         <div className='mt-6 flex gap-5 justify-center items-center'>
            <div className='flex  gap-2 items-center'>
                <h2>Select a Teacher</h2>
            <select name="teachers" className="font-semibold rounded-md caret-accent-blue-500 focus:outline-none focus:border-accent-blue-500  py-3 pl-8"     >
                <option disabled={true} >Select a Teacher</option>
                {teachers.map(teacher => (
                    <option key={teacher.TeacherId} value={teacher.TeacherId}  >{`${teacher.FirstName} ${teacher.LastName}`}</option>
                ))}
            </select>
            </div>
            <div className='flex  gap-2 items-center'>
            <h2>Select a Classroom</h2>
            <select name="classrooms" className="font-semibold text-left rounded-md caret-accent-blue-500 focus:outline-none focus:border-accent-blue-500  py-3 pl-8"     >
                <option disabled={true} >Select a Classroom</option>
                {classrooms.map(subject => (
                    <option key={subject.ClassroomId} value={subject.ClassroomId}  >{subject.ClassName}</option>
                ))}
        </select>
            </div>
            
            
            <button className='bg-colorGreenDark rounded-md font-semibold py-3 px-6 place-self-end items-center'>Allocate</button>
        </div>
        {/* <div className='flex mt-5 gap-5 justify-center items-center'>
       
        </div> */}
         
        
        </Form>   
        {
            isLoadingallocateClassrooms ? 
            <div className='flex justify-center h-[calc(100%-7rem)] items-center'>
            <RiseLoader
            color={'#FFF'}
            loading={isLoadingallocateClassrooms}
            
            size={6}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
            </div>
             : ''
        
         }
         {(!isLoadingallocateClassrooms && error) &&<div className='flex justify-center h-[calc(100%-3rem)] items-center'><h2>Error Occured</h2></div> }
        {allocateClassrooms.length > 0 && <AllocateClassroomTable handleDelete={handleDelete} allocateClassrooms={allocateClassrooms}/>} 
        {isDeleteConfirmationOpen && <DeleteConfirmation actionRoute="/allocateClassrooms" recordId={deletingAllocatedSubject} handleDeleteCancel={handleDeleteCancel} />}
        </>
    );
}

export default AllocateClassroomsPage;

export async function action({ request, params }) {
    
    const method = request.method;
    const formData = await request.formData();
    if(method == 'POST')
    {
        const allocatedClassroom = {
            teacherId : formData.get("teachers"),  
            classroomId: formData.get("classrooms")
    
          };
    
        console.log('allocat' , allocatedClassroom);
    
            try {
                const response = await axios.post("http://localhost:5251/api/AllocateClassrooms", allocatedClassroom);
                console.log(response.data);
                return response.data;
              } catch (error) {
                return error.response.data;
              }
    }
    else if(method == 'DELETE')
    {
        const alloclassId = formData.get("delRecId");
        console.log('delid' + alloclassId);
        try {
            const response = await axios.delete(`http://localhost:5251/api/AllocateClassrooms/${alloclassId}`);
            console.log(response.data);
            return response.data;
          } catch (error) {
            return error.response.data;
          }
    }
    
    

        
    
}
