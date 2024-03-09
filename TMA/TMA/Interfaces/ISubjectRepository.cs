using TMA.Models;

namespace TMA.Interfaces
{
    public interface ISubjectRepository
    {
        bool SaveOrUpdateSubject(Subject subject);

        Subject GetSubjectById(int id);

        bool SubjectExists(int subjectId);

        bool DeleteSubject(Subject subject);
    }
}
