/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Form } from 'react-router-dom';
import { MdClose } from "react-icons/md";
import Button from '../button/Button';

function DeleteConfirmation({handleDeleteCancel , recordId , actionRoute }) {
    console.log(actionRoute);
    return (
        <div className="absolute inset-0 p-5  lg:p-0 bg-black bg-opacity-30 backdrop-blur-sm mx-auto z-20 flex justify-center items-center">
        <div className="lg:w-1/2 max-h-[30rem] bg-zinc-900 rounded-md flex flex-col  p-4 py-7  ">
            
                <div className='px-8  w-full flex justify-between items-center'>
                    <h2>Delete Record</h2>
                    <MdClose onClick={() => handleDeleteCancel()} size={18} className="opacity-50 hover:opacity-100 cursor-pointer" />
                </div>
                <div className='px-8 py-3  w-full'>
                    Are you sure you want to delete this record?
                </div>
                
                <Form
              method="delete"
              action={actionRoute}
              className="rounded-lg shadow-hard-gray"
            >
                {recordId && <input name='delRecId' hidden value={recordId} readOnly />}
                <div className='px-8 flex gap-3 justify-start items-center'>
                <Button type='button' onClick={() => handleDeleteCancel()} className=' px-6 bg-colorBlue rounded-lg'>No</Button>    
                <Button  className='px-6 bg-red-500 rounded-lg'>Yes</Button>
                </div>
                
            </Form>
            </div>
        </div>
    );
}

export default DeleteConfirmation;