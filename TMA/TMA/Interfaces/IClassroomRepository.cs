using TMA.Models;

namespace TMA.Interfaces
{
    public interface IClassroomRepository
    {
        List<Classroom> GetAll();

        bool SaveOrUpdateClassroom(Classroom classroom);

        Classroom GetClassroomById(int id);

        Classroom GetClassroomByName(string name);

        bool ClassroomExists(int classroomId);

        bool DeleteClassroom(Classroom classroom);
    }
}
