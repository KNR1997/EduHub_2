using Microsoft.EntityFrameworkCore;
using TMA.Data;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Repository
{
    public class ClassroomRepository : IClassroomRepository
    {
        private readonly DataContext _context;

        public ClassroomRepository(DataContext context) 
        {
            _context = context;
        }

        public List<Classroom> GetAll()
        {
            return _context.Classrooms.ToList();
        }

        public bool SaveOrUpdateClassroom(Classroom classroom)
        {
            if (classroom.Id == 0)
            {
                _context.Add(classroom);
            }
            else
            {
                _context.Update(classroom);
            }

            return Save();
        }

        public Classroom GetClassroomById(int id)
        {
            return _context.Classrooms
                    .Include(c => c.Teachers)
                    .Where(w => w.Id == id)
                    .FirstOrDefault();
        }

        public bool ClassroomExists(int classroomId)
        {
            return _context.Classrooms.Any(w => w.Id == classroomId);
        }

        public bool DeleteClassroom(Classroom classroom)
        {
            _context.Remove(classroom);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
