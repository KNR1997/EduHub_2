using Microsoft.EntityFrameworkCore.Metadata.Internal;
using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Services
{
    public class ClassroomService
    {
        private readonly IClassroomRepository _classroomRepository;

        public ClassroomService(IClassroomRepository classroomRepository) 
        {
            _classroomRepository = classroomRepository;
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
