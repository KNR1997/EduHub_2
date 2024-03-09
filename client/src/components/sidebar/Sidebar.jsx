/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { NavLink , Outlet , useLocation  } from 'react-router-dom';
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher , FaArrowLeft  } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBookOpen } from "react-icons/fa";
import { MdBookmarkAdded } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { BiSolidReport } from "react-icons/bi";

function Sidebar(props) {
    const [isSidebarCollapsed , setIsSidebarCollapsed ] = useState(false);
    const location = useLocation();
    const pathName = location.pathname.split('/')[1];

    function collapesMenu() {
        setIsSidebarCollapsed(prev => !prev)
    }



    let navItemClass = 'relative cursor-pointer grid grid-cols-[40px_1fr] py-2 px-4 pl-8 my-2 mx-0 items-center before:absolute before:content-[""] before:top-0 before:right-0 before:w-0 before:h-full before:bg-colorGreenDark before:rounded-b-md before:rounded-t-md  after:absolute after:content-[""] after:top-0 after:left-0 after:w-0 after:h-full after:bg-activeNavLinkHover after:z-10 after:transition-all after:ease-in-out after:duration-300 hover:after:w-full after:text-white'
    return (
        <>
        <div className='p-4 gap-4 sm:p-10 flex h-screen sm:gap-10 transition-all ease-in-out duration-300'>
            <div className={`fixed sm:translate-x-[0%] h-[calc(100%-2rem)] z-40 sm:z-0 sm:h-full w-60  sm:relative flex flex-col text-colorGrey3 justify-between bg-themeBg2 border-2 border-borderColor2 rounded-2xl transition-all ease-in-out ${isSidebarCollapsed ? 'transition-transform translate-x-[-107%]' : 'translate-x-[0%]'} `}>
                <button className={`sm:hidden toggle-nav p-2 absolute -right-9 top-9 rounded-r-lg border-2 border-l-themeBg2 border-r-borderColor2 border-y-borderColor2 bg-themeBg2 `}>
                    {isSidebarCollapsed  ? <GiHamburgerMenu onClick={collapesMenu} /> : <FaArrowLeft onClick={collapesMenu}/>}
                </button>
                <div className='m-6 pt-4 px-3 relative text-colorGrey0 text-center font-bold'>
                    <h2 className=''>EduHub</h2>
                </div>
                <ul className='flex flex-col'>
                    <li className={`${navItemClass} ${pathName == 'students' && 'bg-activeNavLink before:w-1 text-white'} `}><PiStudent/><NavLink to='students' className={({isActive}) => (isActive ? 'text-white' : 'z-20')} >Students</NavLink></li> 
                    <li className={`${navItemClass} ${pathName == 'classrooms' && 'bg-activeNavLink before:w-1 text-white'} `}><FaChalkboardTeacher/> <NavLink to='classrooms' className={({isActive}) => (isActive ? 'text-white' : 'z-20')}>Classrooms</NavLink></li> 
                   <li className={`${navItemClass} ${pathName == 'teachers' && 'bg-activeNavLink before:w-1 text-white'} `}><FaChalkboardTeacher/> <NavLink to='teachers' className={({isActive}) => (isActive ? 'text-white' : 'z-20')}>Teachers</NavLink></li> 
                   <li className={`${navItemClass} ${pathName == 'Subjects' && 'bg-activeNavLink before:w-1 text-white'} `}><FaBookOpen/> <NavLink to='Subjects' className={({isActive}) => (isActive ? 'text-white' : 'z-20')}>Subjects</NavLink></li> 
                   <li className={`${navItemClass} ${pathName == 'allocateSubjects' && 'bg-activeNavLink before:w-1 text-white'} `}><MdBookmarkAdded/> <NavLink to='allocateSubjects' className={({isActive}) => (isActive ? 'text-white' : 'z-20')}>Allo Subjects</NavLink></li> 
                   <li className={`${navItemClass} ${pathName == 'allocateClassrooms' && 'bg-activeNavLink before:w-1 text-white'} `}><GiTeacher/> <NavLink to='allocateClassrooms' className={({isActive}) => (isActive ? 'text-white' : 'z-20')}>Allo Classes</NavLink></li> 
                   <li className={`${navItemClass} ${pathName == 'studentDetailReport' && 'bg-activeNavLink before:w-1 text-white'} `}><BiSolidReport/> <NavLink to='studentDetailReport' className={({isActive}) => (isActive ? 'text-white' : 'z-20')}>Student Rep.</NavLink></li> 
                </ul>
                <div>
                    <h2 className='text-sm text-center m-6 pt-4 px-3'></h2>
                </div>
            </div>
            <div className='w-full relative bg-themeBg2 border-2 border-borderColor2 rounded-2xl p-8 overflow-auto'>
                <Outlet />
                {pathName == '' && <>
                <div className=' text-colorGreenDark flex gap-3 flex-col justify-center items-center h-[calc(100%-2rem)]'>
                <h2 className='text-6xl font-bold'>EduHub</h2>
                <h2>Streamlining Education, Empowering Futures</h2>
                </div>
                </>}
            </div>
            
        </div>

        </>
        
    );
}

export default Sidebar;