using TMA.Models;

namespace TMA.Interfaces
{
    public interface ITeacherRepository
    {
        bool SaveOrUpdateTeacher(Teacher teacher);

        Teacher GetTeacherById(int id);

        bool TeacherExists(int teacherId);

        bool DeleteTeacher(Teacher teacher);
    }
}
