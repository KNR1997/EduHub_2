/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { MdClose } from "react-icons/md";
import { useState } from 'react';
import {Form ,useNavigation} from 'react-router-dom'
import Input from '../../components/input/Input.jsx'

function SubjectModal({closeModal ,editSubject}) {
    const navigation = useNavigation();

    const isAddingSubject = navigation.state === "submitting";

    const [form, setForm] = useState([
        {
          id: "subjectName",
          name: "subjectName",
          type: "text",
          placeholder: "Subject Name",
          validate: ["isNotEmpty"],
          isValidated: false,
          errorFormName: "Subject Name",
          error: "",
          value: ""
        }
    ]);

    useEffect(() => {
        if(editSubject){
          setForm(prevForm => {
            let newForm = [...prevForm];
            newForm[0].value = editSubject.SubjectName;
            
            return newForm;
    
          })
        } 
       }, [editSubject]); 
    return (
        <div className="absolute inset-0 p-5  lg:p-0 bg-black bg-opacity-30 backdrop-blur-sm mx-auto z-20 flex justify-center items-center">
        <div className="lg:w-1/2 max-h-[30rem] bg-zinc-900 rounded-md flex flex-col  p-4 py-7  ">
            
                <div className='px-8  w-full flex justify-between items-center'>
                    <h2>{editSubject ?'Update Subject' : 'Add New Subject'}</h2>
                    <MdClose onClick={() => closeModal()} size={18} className="opacity-50 hover:opacity-100 cursor-pointer" />
                </div>
                
                <Form
              method={editSubject ? "put":"post"}
              action="/subjects"
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
                {editSubject && <input name='editSubjectId' hidden value={editSubject.SubjectId} readOnly />}
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
              {editSubject && <button className="bg-orange-500 font-semibold text-sm text-white py-2  rounded-lg text-center w-full uppercase ">
                  {isAddingSubject ? "Updating Subject" : "Update Subject"} 
                </button>}
               {editSubject == null && <button className="bg-colorBlue font-semibold text-sm text-white py-2  rounded-lg text-center w-full uppercase ">
                  {isAddingSubject ? "Adding Subject" : "Add Subject"} 
                </button>} 
              


              </div>
             
            </Form>


        </div>
        
    </div>
    );
}

export default SubjectModal;