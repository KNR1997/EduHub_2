using TMA.Data;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Repository
{
    public class SubjectRepository : ISubjectRepository
    {
        private readonly DataContext _context;

        public SubjectRepository(DataContext context)
        {
            _context = context;
        }

        public List<Subject> GetAll()
        {
            return _context.Subjects.ToList();
        }

        public bool SaveOrUpdateSubject(Subject subject)
        {
            if (subject.Id == 0)
            {
                _context.Add(subject);
            }
            else
            {
                _context.Update(subject);
            }

            return Save();
        }

        public Subject GetSubjectById(int id)
        {
            return _context.Subjects.Where(w => w.Id == id).FirstOrDefault();
        }

        public bool SubjectExists(int classroomId)
        {
            return _context.Subjects.Any(w => w.Id == classroomId);
        }

        public bool DeleteSubject(Subject subject)
        {
            _context.Remove(subject);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
