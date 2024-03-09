using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Services
{
    public class SubjectService
    {
        private readonly ISubjectRepository _subjectRepository;
        private readonly ITeacherRepository _teacherRepository;

        public SubjectService(ISubjectRepository subjectRepository, ITeacherRepository teacherRepository)
        {
            _subjectRepository = subjectRepository;
            _teacherRepository = teacherRepository;
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
