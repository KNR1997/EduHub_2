using AutoMapper;
using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Services
{
    public class WorkspaceService
    {
        private readonly IWorkspaceRepository _workspaceRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public WorkspaceService(IWorkspaceRepository workspaceRepository, IMapper mapper, IUserRepository userRepository)
        {
            _workspaceRepository = workspaceRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public void SaveOrUpdateWorkspace(WorkspaceDto updateDTO, string userName)
        {
            Workspace workspace;
            bool isNew = (updateDTO.Id == 0);
            var owner = _userRepository.GetUser(userName);

            if (!isNew) 
            {
                workspace = _workspaceRepository.GetWorkspace(updateDTO.Id);
            } else
            {
                workspace   = new Workspace();
            }

            workspace.Name = updateDTO.Name;
            workspace.Owner = owner;

            _workspaceRepository.SaveOrUpdateWorkspace(workspace);
        }

        public IEnumerable<WorkspaceDto> GetWorkspacesByUser(string userName)
        {
            var userModel = _userRepository.GetUser(userName);
            var workspaces = _workspaceRepository.GetWorkspaceByUser(userModel);
            return _mapper.Map<IEnumerable<WorkspaceDto>>(workspaces);
        }

        public void DeleteWorkspace(int workspaceId, string userName)
        {
            var userModel = _userRepository.GetUser(userName);

            if (_workspaceRepository.WorkspaceExists(workspaceId))
            {
                // Check if the user has permission to delete the workspace (if needed)
                // You might want to implement additional logic based on your requirements

                // Perform the deletion
                _workspaceRepository.DeleteWorkspace(workspaceId);
            }
        }
    }
}
