using AutoMapper;
using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Services
{
    public class AllocateSubjectsService
    {
        private readonly ISubjectRepository _subjectRepository;
        private readonly ITeacherRepository _teacherRepository;
        private readonly IMapper _mapper;

        public AllocateSubjectsService(ISubjectRepository subjectRepository, ITeacherRepository teacherRepository, IMapper mapper)
        {
            _subjectRepository = subjectRepository;
            _teacherRepository = teacherRepository;
            _mapper = mapper;
        }

        public void AllocateSubject(AllocateSubjectDto updateDTO)
        {
            Teacher teacher = _teacherRepository.GetTeacherById(updateDTO.TeacherId);
            Subject subject = _subjectRepository.GetSubjectById(updateDTO.SubjectId);
            teacher.Subjects.Add(subject);

            _teacherRepository.SaveOrUpdateTeacher(teacher);
        }

        public List<SubjectDto> GetAllocatedSubjects(int teacherId)
        {
            List<Subject> subjects = _teacherRepository.GetTeacherSubjects(teacherId);
            List<SubjectDto> subjectDtos = _mapper.Map<List<SubjectDto>>(subjects);

            return subjectDtos;
        }

        public void DeallocateSubject(AllocateSubjectDto allocateSubjectDto)
        {
            _teacherRepository.DeallocateSubject(allocateSubjectDto);
        }
    }
}
