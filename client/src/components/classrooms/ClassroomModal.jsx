/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { MdClose } from "react-icons/md";
import { useState } from 'react';
import {Form ,useNavigation} from 'react-router-dom'
import Input from '../../components/input/Input.jsx'
function ClassroomModal({closeModal ,editClassroom}) {
    const navigation = useNavigation();

    const isAddingStudent = navigation.state === "submitting";

    const [form, setForm] = useState([
        {
          id: "className",
          name: "className",
          type: "text",
          placeholder: "Class Name",
          validate: ["isNotEmpty"],
          isValidated: false,
          errorFormName: "Class Name",
          error: "",
          value: ""
        }
    ])

    useEffect(() => {
        if(editClassroom){
          setForm(prevForm => {
            let newForm = [...prevForm];
            newForm[0].value = editClassroom.ClassName;
            
            return newForm;
    
          })
        } 
       }, [editClassroom]); 
    return (
        <div className="absolute inset-0 p-5  lg:p-0 bg-black bg-opacity-30 backdrop-blur-sm mx-auto z-20 flex justify-center items-center">
        <div className="lg:w-1/2 max-h-[30rem] bg-zinc-900 rounded-md flex flex-col  p-4 py-7  ">
            
                <div className='px-8  w-full flex justify-between items-center'>
                    <h2>{editClassroom ?'Update Classroom' : 'Add New Classroom'}</h2>
                    <MdClose onClick={() => closeModal()} size={18} className="opacity-50 hover:opacity-100 cursor-pointer" />
                </div>
                
                <Form
              method={editClassroom ? "put":"post"}
              action="/classrooms"
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
                {editClassroom && <input name='editClassroomId' hidden value={editClassroom.ClassroomId} readOnly />}
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
              {editClassroom && <button className="bg-orange-500 font-semibold text-sm text-white py-2  rounded-lg text-center w-full uppercase ">
                  {isAddingStudent ? "Updating Classroom" : "Update Classroom"} 
                </button>}
               {editClassroom == null && <button className="bg-colorBlue font-semibold text-sm text-white py-2  rounded-lg text-center w-full uppercase ">
                  {isAddingStudent ? "Adding Classroom" : "Add Classroom"} 
                </button>} 
              


              </div>
             
            </Form>


        </div>
        
    </div>
    );
}

export default ClassroomModal;