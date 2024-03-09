using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Services
{
    public class AllocateSubjectsService
    {
        private readonly ISubjectRepository _subjectRepository;
        private readonly ITeacherRepository _teacherRepository;

        public AllocateSubjectsService(ISubjectRepository subjectRepository, ITeacherRepository teacherRepository)
        {
            _subjectRepository = subjectRepository;
            _teacherRepository = teacherRepository;
        }

        public void AllocateSubjects(AllocateSubjectDto updateDTO)
        {
            Teacher teacher = _teacherRepository.GetTeacherById(updateDTO.TeacherId);
            Subject subject = _subjectRepository.GetSubjectById(updateDTO.ClassroomId);
            teacher.Subjects.Add(subject);

            _teacherRepository.SaveOrUpdateTeacher(teacher);
        }
    }
}
