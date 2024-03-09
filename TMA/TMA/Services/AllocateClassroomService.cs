using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Services
{
    public class AllocateClassroomService
    {
        private readonly IClassroomRepository _classroomRepository;
        private readonly ITeacherRepository _teacherRepository;

        public AllocateClassroomService(IClassroomRepository classroomRepository, ITeacherRepository teacherRepository)
        {
            _classroomRepository = classroomRepository;
            _teacherRepository = teacherRepository;
        }
        internal void AllocateClassrooms(AllocateClassroomsDto updateDTO)
        {
            Teacher teacher = _teacherRepository.GetTeacherById(updateDTO.TeacherId);
            Classroom classroom = _classroomRepository.GetClassroomById(updateDTO.ClassroomId);
            teacher.Classrooms.Add(classroom);

            _teacherRepository.SaveOrUpdateTeacher(teacher);
        }
    }
}
