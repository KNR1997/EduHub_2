using AutoMapper;
using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Services
{
    public class AllocateClassroomService
    {
        private readonly IClassroomRepository _classroomRepository;
        private readonly ITeacherRepository _teacherRepository;
        private readonly IMapper _mapper;

        public AllocateClassroomService(IClassroomRepository classroomRepository, ITeacherRepository teacherRepository, IMapper mapper)
        {
            _classroomRepository = classroomRepository;
            _teacherRepository = teacherRepository;
            _mapper = mapper;
        }
        internal void AllocateClassrooms(AllocateClassroomDto updateDTO)
        {
            Teacher teacher = _teacherRepository.GetTeacherById(updateDTO.TeacherId);
            Classroom classroom = _classroomRepository.GetClassroomById(updateDTO.ClassroomId);
            teacher.Classrooms.Add(classroom);

            _teacherRepository.SaveOrUpdateTeacher(teacher);
        }

        public List<ClassroomDto> GetAllocatedSubjects(int teacherId)
        {
            List<Classroom> classrooms = _teacherRepository.GetTeacherClassrooms(teacherId);
            List<ClassroomDto> classroomDtos = _mapper.Map<List<ClassroomDto>>(classrooms);

            return classroomDtos;
        }

        public void DeallocateClassroom(AllocateClassroomDto allocateClassroomDto)
        {
            _teacherRepository.DeallocateClassroom(allocateClassroomDto);
        }


    }
}
