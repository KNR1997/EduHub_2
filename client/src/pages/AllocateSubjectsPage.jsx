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
import RiseLoader from "react-spinners/RiseLoader";

function AllocateSubjectsPage(props) {

    const { data:teachers , isLoadingTeachers , errorTeachers } = useFetch("http://localhost:5251/api/Teachers");
    const { data:subjects , isLoadingSubjects , errorSubjects } = useFetch("http://localhost:5251/api/Subjects");
    const { data:allocateSubjects , isLoadingallocateSubjects , errorallocateSubjects ,fetchData } = useFetch("http://localhost:5251/api/AllocateSubjects");
    const [isDeleteConfirmationOpen , setIsDeleteConfirmationOpen ] = useState(false);
    const [deletingAllocatedSubject, setdDeletingAllocatedSubject] = useState(null);

    const data = useActionData()
 
    const navigate = useNavigate();

    useEffect(()=> {
        
        if((data && data.Message) && (data.Message == 'AllocateSubject Created' || data.Message == 'AllocateSubject Deleted') ) 
        {
            console.log('data call');
            fetchData("http://localhost:5251/api/AllocateSubjects");
        }

    },[data,fetchData]);

    
    
  

    useEffect(()=> {
        
        if((data && data.Message) && (data.Message == 'AllocateSubject Deleted')) 
        {
            
                setIsDeleteConfirmationOpen(false)
            
            
        }
    },[data,navigate]);

    function handleDelete(data) {
        console.log('dasa' , data);
        setdDeletingAllocatedSubject(data.AllocateSubjectId);
        setIsDeleteConfirmationOpen(true);
        console.log('dek' , data);
    }

    function handleDeleteCancel(){
        setIsDeleteConfirmationOpen(false)
    }
    return (
        <>
        <div className='flex justify-center items-center'>
           <span className=' relative pb-1 after:content-[""] after:absolute after:left-10   after:bottom-0 after:border-[2px] after:rounded-2xl after:border-colorGreenDark after:w-[50%] text-xl'>Allocate Subjects</span>
        </div>
        
         <Form
         method="post"
         action="/allocateSubjects"
         
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
            <h2>Select a Subject</h2>
            <select name="subjects" className="font-semibold text-left rounded-md caret-accent-blue-500 focus:outline-none focus:border-accent-blue-500  py-3 pl-8"     >
                <option disabled={true} >Select a Subject</option>
                {subjects.map(subject => (
                    <option key={subject.SubjectId} value={subject.SubjectId}  >{subject.SubjectName}</option>
                ))}
        </select>
            </div>
            
            
            <button className='bg-colorGreenDark rounded-md font-semibold py-3 px-6 place-self-end items-center'>Allocate</button>
        </div>
        {/* <div className='flex mt-5 gap-5 justify-center items-center'>
       
        </div> */}
        
        </Form> 
        {
            isLoadingallocateSubjects ? 
            <div className='flex justify-center h-[calc(100%-3rem)] items-center'>
            <RiseLoader
            color={'#FFF'}
            loading={isLoadingallocateSubjects}
            
            size={6}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
            </div>
             : ''
        
         }  
        {allocateSubjects.length > 0 && <AllocateSubjectsTable handleDelete={handleDelete} allocateSubjects={allocateSubjects}/>} 
        {isDeleteConfirmationOpen && <DeleteConfirmation actionRoute="/allocateSubjects" recordId={deletingAllocatedSubject} handleDeleteCancel={handleDeleteCancel} />}
        </>
    );
}

export default AllocateSubjectsPage;

export async function action({ request, params }) {
    
    const method = request.method;
    const formData = await request.formData();
    if(method == 'POST')
    {
        const allocatedSubject = {
            teacherId : formData.get("teachers"),  
            subjectId: formData.get("subjects")
    
          };
    
        console.log('allocat' , allocatedSubject);
    
            try {
                const response = await axios.post("http://localhost:5251/api/AllocateSubjects", allocatedSubject);
                console.log(response.data);
                return response.data;
              } catch (error) {
                return error.response.data;
              }
    }
    else if(method == 'DELETE')
    {
        const alloSubId = formData.get("delRecId");
        console.log('delid' + alloSubId);
        try {
            const response = await axios.delete(`http://localhost:5251/api/AllocateSubjects/${alloSubId}`);
            console.log(response.data);
            return response.data;
          } catch (error) {
            return error.response.data;
          }
    }
    
    

        
    
}
