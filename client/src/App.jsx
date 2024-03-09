import Sidebar from "./components/sidebar/Sidebar"
import StudentPage from "./pages/StudentPage"
import TeachersPage ,{action as handleTeacherActions} from "./pages/TeachersPage"
import {action as handleStudentCreation} from './pages/StudentPage'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import ClassroomPage from "./pages/ClassroomPage"
import SubjectsPage, {action as handleSubjectActions} from "./pages/SubjectsPage"
import {action as handleClassroomActions} from './pages/ClassroomPage'
import AllocateSubjectsPage , {action as handleAllocateSubjects} from "./pages/AllocateSubjectsPage"
import AllocateClassroomsPage ,  {action as handleAllocateClassrooms} from "./pages/AllocateClassroomsPage"
import StudentDetailReportPage from "./pages/StudentDetailReportPage"



const router = createBrowserRouter([
  {
    path : '/',
    element : <Sidebar />,
    children : [
      {path : 'students' , element : <StudentPage /> ,  action : handleStudentCreation},
      {path : 'teachers' , element : <TeachersPage /> , action : handleTeacherActions},
      {path : 'classrooms' , element : <ClassroomPage />, action:handleClassroomActions},
      {path : 'subjects' , element : <SubjectsPage /> , action: handleSubjectActions},
      {path : 'allocateSubjects' , element : <AllocateSubjectsPage />, action : handleAllocateSubjects },
      {path : 'allocateClassrooms' , element : <AllocateClassroomsPage />, action : handleAllocateClassrooms },
      {path : 'studentDetailReport' , element : <StudentDetailReportPage /> }
    ]
  }
])


function App() {

  return (
    <>
    
      <RouterProvider router={router}>
      </RouterProvider>
        
    </>
  )
}

export default App
