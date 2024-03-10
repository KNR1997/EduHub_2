using AutoMapper;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Services
{
    public class ClassroomService
    {
        private readonly IClassroomRepository _classroomRepository;
        private readonly IMapper _mapper;

        public ClassroomService(IClassroomRepository classroomRepository, IMapper mapper) 
        {
            _classroomRepository = classroomRepository;
            _mapper = mapper;
        }

        public List<ClassroomDto> GetAllClassrooms()
        {
            List<Classroom> classrooms = _classroomRepository.GetAll();
            List<ClassroomDto> classroomDtos = _mapper.Map<List<ClassroomDto>>(classrooms);

            return classroomDtos;
        }

        public void SaveOrUpdateClassroom(ClassroomDto updateDTO)
        {
            Classroom classroom;
            bool isNew = (updateDTO.Id == 0);

            if (!isNew)
            {
                classroom = _classroomRepository.GetClassroomById(updateDTO.Id);
            }
            else
            {
                classroom = new Classroom();
            }

            classroom.Name = updateDTO.Name;
            _classroomRepository.SaveOrUpdateClassroom(classroom);
        }

        public void DeleteClassroom(int classroomId)
        {
            Classroom classroom = _classroomRepository.GetClassroomById(classroomId);
            _classroomRepository.DeleteClassroom(classroom);
        }
    }
}
