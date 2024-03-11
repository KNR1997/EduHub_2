using AutoMapper;
using TMA.Dtos;
using TMA.Dtos.FormDtos;
using TMA.Dtos.PageDtos;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Services
{
    public class StudentService
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IClassroomRepository _classroomRepository;
        private readonly ITeacherRepository _teacherRepository;
        private readonly IMapper _mapper;

        public StudentService(IStudentRepository studentRepository, IClassroomRepository classroomRepository, ITeacherRepository teacherRepository, IMapper mapper)
        {
            _studentRepository = studentRepository;
            _classroomRepository = classroomRepository;
            _teacherRepository = teacherRepository;
            _mapper = mapper;
        }

        public List<StudentPageDto> GetAllStudents()
        {
            List<Student> students = _studentRepository.GetAll();
            List<StudentPageDto> studentPageDtos = _mapper.Map<List<StudentPageDto>>(students);

            return studentPageDtos;
        }

        public void SaveOrUpdateStudent(StudentFormDto updateDTO)
        {
            try
            {
                Student student;
                bool isNew = (updateDTO.Id == 0);

                if (!isNew)
                {
                    student = _studentRepository.GetStudentById(updateDTO.Id);
                }
                else
                {
                    student = new Student();
                }

                student.FirstName = updateDTO.FirstName;
                student.LastName = updateDTO.LastName;
                student.Email = updateDTO.ContactPerson;
                student.ContactPerson = updateDTO.ContactPerson;
                student.ContactNo = updateDTO.ContactNo;
                student.Dob = updateDTO.Dob;
                student.ClassroomName = updateDTO.ClassroomName;
                student.Classroom = _classroomRepository.GetClassroomByName(updateDTO.ClassroomName);

                // Calculate age
                DateTime currentDate = DateTime.UtcNow;
                int age = currentDate.Year - updateDTO.Dob.Year;

                // Check if the birthday has occurred this year
                if (currentDate < updateDTO.Dob.AddYears(age))
                {
                    age--;
                }
                student.Age = age;

                _studentRepository.SaveOrUpdateStudent(student);
            }
            catch (Exception ex)
            {
                // Handle the exception here, you can log it or perform any other necessary actions.
                // For example, you can log the exception to a logging system or rethrow it.
                // It's generally not recommended to catch all exceptions unless you have a good reason.
                // Consider catching specific exceptions that you expect might occur.

                // Log the exception (replace with your logging mechanism)
                Console.WriteLine($"Error in SaveOrUpdateStudent: {ex.Message}");

                // Optionally rethrow the exception to propagate it further
                throw;
            }
        }

        public void DeleteClassroom(int studentId)
        {
            Student student = _studentRepository.GetStudentById(studentId);
            _studentRepository.DeleteStudent(student);
        }

        public StudentReportDto GetStudentReport(int studentId)
        {
            StudentReportDto studentReportDto = new StudentReportDto();
            Student student = _studentRepository.GetStudentById(studentId);
            Classroom classroom = _classroomRepository.GetClassroomById(student.ClassroomId);

            studentReportDto.FullName = student.FirstName;
            studentReportDto.Classroom = student.Classroom.Name;
            studentReportDto.ContactPerson = student.ContactPerson;
            studentReportDto.Email = student.Email;
            studentReportDto.ContactNo = student.ContactNo;
            studentReportDto.Dob = student.Dob;

            List<Teacher> teachers = new List<Teacher>();

            foreach (Teacher t in classroom.Teachers)
            {
                Teacher teacher = _teacherRepository.GetTeacherById(t.Id);
                teachers.Add(teacher);
            }

            // Create a Dictionary to store teacher names and their subjects
            Dictionary<string, string> teacherSubjectsMap = new Dictionary<string, string>();

            // Loop through each teacher
            foreach (var teacher in teachers)
            {
                // Assuming Teachers have a Subjects collection representing the many-to-many relationship
                List<Subject> subjects = teacher.Subjects.ToList();

                // Loop through each subject of the teacher
                foreach (var subject in subjects)
                {
                    // Add the teacher's first name and subject's name to the dictionary
                    teacherSubjectsMap.Add(teacher.FirstName, subject.Name);
                }
            }

            studentReportDto.TeacherSubjectsMap = teacherSubjectsMap;

            return studentReportDto;
        }
    }
}
