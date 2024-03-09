/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { MdClose } from "react-icons/md";
import { useState } from 'react';
import Input from '../input/input';
import {Form ,useNavigation} from 'react-router-dom'
import useFetch from '../../hooks/useFetch';

function TeacherModal({closeModal ,editTeacher}) {

  const navigation = useNavigation();

  const isAddingTeacher = navigation.state === "submitting";

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
    ]);

    useEffect(() => {
        if(editTeacher){
          console.log('ed' ,editTeacher);
          setForm(prevForm => {
            let newForm = [...prevForm];
            newForm[0].value = editTeacher.FirstName;
            newForm[1].value = editTeacher.LastName;
            newForm[2].value = editTeacher.EmailAddress;
            newForm[3].value = editTeacher.ContactNo;
            
    
            return newForm;
    
          })
        } 
       }, [editTeacher]); 

    return (
        <div className="absolute inset-0 p-5  lg:p-0 bg-black bg-opacity-30 backdrop-blur-sm mx-auto z-20 flex justify-center items-center">
            <div className="lg:w-1/2 max-h-[30rem] bg-zinc-900 rounded-md flex flex-col  p-4 py-7  ">
                
                    <div className='px-8  w-full flex justify-between items-center'>
                        <h2>{editTeacher ?'Update Teacher' : 'Add New Teacher'}</h2>
                        <MdClose onClick={() => closeModal()} size={18} className="opacity-50 hover:opacity-100 cursor-pointer" />
                    </div>
                    
                    <Form
                  method={editTeacher ? "put":"post"}
                  action="/teachers"
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
                    {editTeacher && <input name='editTeacherId' hidden value={editTeacher.TeacherId} readOnly />}
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
                          value={_form.value}

                        />
                      );
                    })}
                    
                    
                    
                  </div>
                  <div className='px-8'>
                  {editTeacher && <button className="bg-orange-500 font-semibold text-sm text-white py-2  rounded-lg text-center w-full uppercase ">
                      {isAddingTeacher ? "Updating Teacher" : "Update"} 
                    </button>}
                   {editTeacher == null && <button className="bg-colorBlue font-semibold text-sm text-white py-2  rounded-lg text-center w-full uppercase ">
                      {isAddingTeacher ? "Adding Teacher" : "Add Teacher"} 
                    </button>} 
                  


                  </div>
                 
                </Form>


            </div>
            
        </div>
    );
}

export default TeacherModal;