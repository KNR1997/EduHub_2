using AutoMapper;
using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Services
{
    public class TeacherService
    {
        private readonly ITeacherRepository _teacherRepository;
        private readonly IMapper _mapper;


        public TeacherService(ITeacherRepository teacherRepository, IMapper mapper)
        {
            _teacherRepository = teacherRepository;
            _mapper = mapper;
        }

        public List<TeacherDto> GetAllTeachers()
        {
            List<Teacher> teachers = _teacherRepository.GetAll();
            List<TeacherDto> teacherDtos = _mapper.Map<List<TeacherDto>>(teachers);

            return teacherDtos;
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
