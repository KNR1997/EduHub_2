using TMA.Dtos;
using TMA.Models;

namespace TMA.Interfaces
{
    public interface IWorkspaceRepository
    {
        ICollection<Workspace> GetWorkspaces();

        bool SaveOrUpdateWorkspace(Workspace workspace);

        ICollection<Workspace> GetWorkspaceByUser(User user);

        bool DeleteWorkspace(Workspace workspace);

        Workspace GetWorkspace(int id);

        Workspace GetWorkspace(string name);

        bool WorkspaceExists(int workspaceId);

        bool Save();
 
    }
}
