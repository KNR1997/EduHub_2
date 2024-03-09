/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { MdClose } from "react-icons/md";
import { useState } from 'react';
import Input from '../input/input';
import {Form ,useNavigation} from 'react-router-dom'
import useFetch from '../../hooks/useFetch';

function StudentModal({closeModal ,editStudent}) {

  const { data:classrooms , isLoading , error } = useFetch("http://localhost:5251/api/Classrooms");


  const navigation = useNavigation();

  const isAddingStudent = navigation.state === "submitting";

  


  // useEffect(()=>{
  //   // console.log('datasss' , data);
  //   // if((data && data.Message) && data.Message == 'Student Created') 
  //   // {
  //   //   closeModal();
  //   //   // fetchData("http://localhost:5251/api/Students");
  //   //   navigate('/students')
  //   // }
  // } ,[data,data.Message , closeModal , navigate]);
  
    const [form, setForm] = useState([
        {
          id: "first-name",
          name: "first-name",
          type: "text",
          placeholder: "First name",
          validate: ["isNotEmpty"],
          isValidated: false,
          errorFormName: "First name",
          error: "",
          value: ""
        },
        {
          id: "last-name",
          name: "last-name",
          type: "text",
          placeholder: "Last name",
          validate: ["isNotEmpty"],
          isValidated: false,
          errorFormName: "Last name",
          error: "",
          value: ""
        },
        {
          id: "email",
          name: "email",
          type: "",
          placeholder: "Email",
          validate: ["isNotEmpty", "isEmail"],
          isValidated: false,
          errorFormName: "Email",
          error: "",
          value: ""
        },
        {
          id: "contact-person",
          name: "contact-person",
          type: "text",
          placeholder: "Contact Person",
          validate: ["isNotEmpty"],
          isValidated: false,
          errorFormName: "Contact Person",
          error: "",
          value: ""
        },
        {
            id: "contact-number",
            name: "contact-number",
            type: "number",
            placeholder: "Contact Number",
            validate: ["isNotEmpty"],
            isValidated: false,
            errorFormName: "Contact Number",
            error: "",
            value: ""
          },
          {
            id: "dob",
            name: "dob",
            type: "text",
            placeholder: "Date of Birth",
            validate: ["isNotEmpty"],
            isValidated: false,
            errorFormName: "Date of Birth",
            error: "",
            value: ""
          },
          {
            id: "classroom",
            name: "classroom",
            type: "text",
            placeholder: "Classroom",
            validate: ["isNotEmpty"],
            isValidated: false,
            errorFormName: "Classroom",
            error: "",
            value: ""
          },
      ]);

     useEffect(() => {
      if(editStudent){
        console.log('ed' ,editStudent);
        setForm(prevForm => {
          let newForm = [...prevForm];
          newForm[0].value = editStudent.FirstName;
          newForm[1].value = editStudent.LastName;
          newForm[2].value = editStudent.EmailAddress;
          newForm[3].value = editStudent.ContactPerson;
          newForm[4].value = editStudent.ContactNo;
          newForm[5].value = editStudent.DateOfBirth;
          newForm[6].value = editStudent.ClassName;
  
          return newForm;
  
        })
      } 
     }, [editStudent]); 

     

    return (
        <div className="absolute inset-0 p-5  lg:p-0 bg-black bg-opacity-30 backdrop-blur-sm mx-auto z-20 flex justify-center items-center">
            <div className="lg:w-1/2 max-h-[30rem] bg-zinc-900 rounded-md flex flex-col  p-4 py-7  ">
                
                    <div className='px-8  w-full flex justify-between items-center'>
                        <h2>{editStudent ?'Update Student' : 'Add New Student'}</h2>
                        <MdClose onClick={() => closeModal()} size={18} className="opacity-50 hover:opacity-100 cursor-pointer" />
                    </div>
                    
                    <Form
                  method={editStudent ? "put":"post"}
                  action="/students"
                  className="rounded-lg shadow-hard-gray"
                >
                  <div className="grid grid-cols-2 gap-2 px-8 py-5 text-sm  items-center">
                    {/* {data && data.errors && (
                      <ul>
                        {Object.values(data.error).map((err) => (
                          <li key={err}>{err}</li>
                        ))}
                      </ul>
                    )}
                    {data && data.error.message && (
                      <p className="text-center text-red-600">
                        {data.error.message}
                      </p>
                    )} */}
                    {editStudent && <input name='editStuId' hidden value={editStudent.StudentId} readOnly />}
                    {form.map((_form, _index) => {
                      return (
                        <Input
                          key={`form-${_index}`}
                          id={_form.id}
                          name={_form.name}
                          type={_form.type}
                          placeholder={_form.placeholder}
                          isValidated={_form.isValidated}
                          error={_form.error}
                          classrooms={classrooms}
                          value={_form.value}

                        />
                      );
                    })}
                    
                    
                    
                  </div>
                  <div className='px-8'>
                  {editStudent && <button className="bg-orange-500 font-semibold text-sm text-white py-2  rounded-lg text-center w-full uppercase ">
                      {isAddingStudent ? "Updating Student" : "Update"} 
                    </button>}
                   {editStudent == null && <button className="bg-colorBlue font-semibold text-sm text-white py-2  rounded-lg text-center w-full uppercase ">
                      {isAddingStudent ? "Adding Student" : "Add Student"} 
                    </button>} 
                  


                  </div>
                 
                </Form>


            </div>
            
        </div>
    );
}

export default StudentModal;


