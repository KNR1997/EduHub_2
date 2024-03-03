using TMA.Data;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Repository
{
    public class WorkspaceRepository : IWorkspaceRepository
    {
        private readonly DataContext _context;

        public WorkspaceRepository(DataContext context) 
        {
            _context = context;
        }

        public bool CreateWorkspace(string name)
        {
            var workspace = new Workspace()
            {
                Name = name,
            };

            _context.Add(workspace);

            return Save();
        }

        public Workspace GetWorkspace(int id)
        {
            return _context.Workspaces.Where(w => w.Id == id).FirstOrDefault();
        }

        public Workspace GetWorkspace(string name)
        {
            return _context.Workspaces.Where(w => w.Name == name).FirstOrDefault();
        }

        public ICollection<Workspace> GetWorkspaces() 
        {
            return _context.Workspaces.OrderBy(w => w.Id).ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool WorkspaceExists(int workspaceId)
        {
            return _context.Workspaces.Any(w => w.Id == workspaceId);
        }
    }
}
