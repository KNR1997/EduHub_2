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
            try
            {
                Subject subject = _subjectRepository.GetSubjectById(subjectId);
                _subjectRepository.DeleteSubject(subject);
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
    }
}
