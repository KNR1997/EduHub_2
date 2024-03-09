using TMA.Data;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Repository
{
    public class StudentRepository : IStudentRepository
    {
        private readonly DataContext _context;

        public StudentRepository(DataContext context)
        {
            _context = context;
        }

        public List<Student> GetAll() 
        {
            return _context.Students.ToList();
        }

        public bool SaveOrUpdateStudent(Student student)
        {
            if (student.Id == 0)
            {
                _context.Add(student);
            }
            else
            {
                _context.Update(student);
            }

            return Save();
        }

        public Student GetStudentById(int id)
        {
            return _context.Students.Where(w => w.Id == id).FirstOrDefault();
        }

        public bool StudentExists(int classroomId)
        {
            return _context.Students.Any(w => w.Id == classroomId);
        }

        public bool DeleteStudent(Student student)
        {
            _context.Remove(student);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
