using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Services
{
    public class TeacherService
    {
        private readonly ITeacherRepository _teacherRepository;

        public TeacherService(ITeacherRepository teacherRepository)
        {
            _teacherRepository = teacherRepository;
        }

        public void SaveOrUpdateTeacher(TeacherDto updateDTO)
        {
            Teacher teacher;
            bool isNew = (updateDTO.Id == 0);

            if (!isNew)
            {
                teacher = _teacherRepository.GetTeacherById(updateDTO.Id);
            }
            else
            {
                teacher = new Teacher();
            }

            teacher.FirstName = updateDTO.FirstName;
            teacher.LastName = updateDTO.LastName;
            teacher.ContactNo = updateDTO.ContactNo;
            teacher.Email = updateDTO.Email;

            _teacherRepository.SaveOrUpdateTeacher(teacher);
        }

        public void DeleteTeacher(int teacherId)
        {
            Teacher teacher = _teacherRepository.GetTeacherById(teacherId);
            _teacherRepository.DeleteTeacher(teacher);
        }

    }
}
