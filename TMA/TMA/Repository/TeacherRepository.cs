using Microsoft.EntityFrameworkCore;
using TMA.Data;
using TMA.Dtos;
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

        public List<Teacher> GetAll()
        {
            return _context.Teachers.ToList();
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

        public List<Subject> GetTeacherSubjects(int teacherId)
        {
            return _context.Teachers
                .Where(t => t.Id == teacherId)
                .Include(t => t.Subjects) // Include the Subjects navigation property
                .SelectMany(t => t.Subjects)
                .ToList();
        }

        public void DeallocateSubject(AllocateSubjectDto allocateSubjectDto)
        {
            var teacher = _context.Teachers
                .Include(t => t.Subjects)
                .SingleOrDefault(t => t.Id == allocateSubjectDto.TeacherId);

            if (teacher != null)
            {
                var subject = teacher.Subjects.SingleOrDefault(s => s.Id == allocateSubjectDto.SubjectId);

                if (subject != null)
                {
                    // Remove the relationship
                    teacher.Subjects.Remove(subject);
                    Save();
                }
            }
        }

        public List<Classroom> GetTeacherClassrooms(int teacherId)
        {
            return _context.Teachers
                .Where(t => t.Id == teacherId)
                .Include(t => t.Subjects) // Include the Subjects navigation property
                .SelectMany(t => t.Classrooms)
                .ToList();
        }

        public void DeallocateClassroom(AllocateClassroomDto allocateClassroomDto)
        {
            var teacher = _context.Teachers
                .Include(t => t.Classrooms)
                .SingleOrDefault(t => t.Id == allocateClassroomDto.TeacherId);

            // Handle null exceptions
            if (teacher != null)
            {
                var classroom = teacher.Classrooms.SingleOrDefault(s => s.Id == allocateClassroomDto.ClassroomId);

                if (classroom != null)
                {
                    // Remove the relationship
                    teacher.Classrooms.Remove(classroom);
                    Save();
                }
            }
        }
    }
}
