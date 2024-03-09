using Microsoft.EntityFrameworkCore;
using TMA.Data;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Repository
{
    public class TeacherRepository : ITeacherRepository
    {
        private readonly DataContext _context;

        public TeacherRepository(DataContext context)
        {
            _context = context;
        }

        public bool SaveOrUpdateTeacher(Teacher teacher)
        {
            if (teacher.Id == 0)
            {
                _context.Add(teacher);
            }
            else
            {
                _context.Update(teacher);
            }

            return Save();
        }

        public Teacher GetTeacherById(int id)
        {
            return _context.Teachers
                    .Include(c => c.Subjects)
                    .Where(w => w.Id == id)
                    .FirstOrDefault();
        }

        public bool TeacherExists(int classroomId)
        {
            return _context.Teachers.Any(w => w.Id == classroomId);
        }

        public bool DeleteTeacher(Teacher teacher)
        {
            _context.Remove(teacher);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
