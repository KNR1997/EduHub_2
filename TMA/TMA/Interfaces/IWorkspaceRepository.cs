using TMA.Models;

namespace TMA.Interfaces
{
    public interface IWorkspaceRepository
    {
        ICollection<Workspace> GetWorkspaces();

        Workspace GetWorkspace(int id);

        Workspace GetWorkspace(string name);
        bool WorkspaceExists(int workspaceId);

        bool CreateWorkspace(string name, string description);

        bool Save();
    }
}
