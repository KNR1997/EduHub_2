using TMA.Models;

namespace TMA.Interfaces
{
    public interface IClassroomRepository
    {
        bool SaveOrUpdateClassroom(Classroom classroom);

        Classroom GetClassroomById(int id);

        bool ClassroomExists(int classroomId);

        bool DeleteClassroom(Classroom classroom);
    }
}
