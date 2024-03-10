using AutoMapper;
using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Services
{
    public class SubjectService
    {
        private readonly ISubjectRepository _subjectRepository;
        private readonly IMapper _mapper;

        public SubjectService(ISubjectRepository subjectRepository, IMapper mapper)
        {
            _subjectRepository = subjectRepository;
            _mapper = mapper;
        }

        public List<SubjectDto> GetAllSubjects()
        {
            List<Subject> subjects = _subjectRepository.GetAll();
            List<SubjectDto> subjectDtos = _mapper.Map<List<SubjectDto>>(subjects);

            return subjectDtos;
        }

        public void SaveOrUpdateSubject(SubjectDto updateDTO)
        {
            Subject subject;
            bool isNew = (updateDTO.Id == 0);

            if (!isNew)
            {
                subject = _subjectRepository.GetSubjectById(updateDTO.Id);
            }
            else
            {
                subject = new Subject();
            }

            subject.Name = updateDTO.Name;

            _subjectRepository.SaveOrUpdateSubject(subject);
        }

        public void DeleteSubject(int subjectId)
        {
            Subject subject = _subjectRepository.GetSubjectById(subjectId);
            _subjectRepository.DeleteSubject(subject);
        }
    }
}
