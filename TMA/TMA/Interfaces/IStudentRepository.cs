using TMA.Models;

namespace TMA.Interfaces
{
    public interface IStudentRepository
    {
        List<Student> GetAll();

        bool SaveOrUpdateStudent(Student student);

        Student GetStudentById(int id);

        bool StudentExists(int studentId);

        bool DeleteStudent(Student student);
    }
}
