/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Input({
    id,
    name,
    type,
    placeholder,
    isValidated,
    classrooms,
    value
    // error,
}) {

    // eslint-disable-next-line no-unused-vars
    const [myValue, setMyValue] = useState('');
    
    function inputClass() {
        const defaultClass = [
            "font-semibold",
            "rounded-md",
            "caret-accent-blue-500",
            "focus:outline-none",
            "focus:border-accent-blue-500",
            "w-full",
            "py-3",
            "pl-8",
        ];
        return isValidated
            ? [
                  ...defaultClass,
                  "pr-16",
                  "border-2",
                  "border-primary-red-500",
              ].join(" ")
            : [...defaultClass, "pr-6" ,"place-self-center",].join(" ");
    }
    let foundClassroom = null;

    if(id == 'classroom' && classrooms)
    {
         foundClassroom = classrooms.find(classroom => classroom.ClassName === value); 
         console.log('founde' , foundClassroom);
    }

    // const errorIcon = isShow => {
    //     if (isShow) {
    //         return (
    //             <img
    //                 className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4"
    //                 src={iconError}
    //                 alt=""
    //             />
    //         );
    //     }
    //     return;
    // };

    return (
        <div className="w-full odd:last-of-type:col-span-full  ">
            <div className="w-full ">
                {id == 'dob' && <input
                    type={type}
                    id={id}
                    name={name}
                    defaultValue={value}
                    
                    placeholder={placeholder}
                    className={inputClass()}         
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    
                />}
                {id == 'classroom' ? <select name={name} value={foundClassroom && foundClassroom.ClassroomId} onChange={(e) => setMyValue(e.target.value)}   className={inputClass()}  >
                <option disabled={true} >Select a Classroom</option>
                {classrooms.map(classroom => (
                    <option key={classroom.ClassroomId} value={classroom.ClassroomId}  >{classroom.ClassName}</option>
                ))}
                </select> : (id != 'dob' && id != 'classroom') ?  <input
                type={type}
                id={id}
                name={name}
                defaultValue={value}
                
                placeholder={placeholder}
                className={inputClass()}              
                
            /> : ''}
              
            </div>
           
        </div>
    );
}