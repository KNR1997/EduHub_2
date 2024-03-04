using AutoMapper;
using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Services
{
    public class WorkspaceService
    {
        private readonly IUserRepository _userRepository;
        private readonly IWorkspaceRepository _workspaceRepository;
        private readonly IMapper _mapper;

        public WorkspaceService(IUserRepository userRepository, IMapper mapper, IWorkspaceRepository workspaceRepository)
        {
            _userRepository = userRepository;
            _workspaceRepository = workspaceRepository;
            _mapper = mapper;
        }

        public void SaveOrUpdateWorkspace(WorkspaceDto updateDTO, string userName)
        {
            Workspace workspace;
            bool isNew = (updateDTO.Id == 0);
            User user = _userRepository.GetUser(userName);

            if (!isNew)
            {
                workspace = _workspaceRepository.GetWorkspace(updateDTO.Id);
            }
            else
            {
                workspace = new Workspace();
            }

            workspace.Name = updateDTO.Name;
            workspace.Owner = user;
            _workspaceRepository.SaveOrUpdateWorkspace(workspace);
        }

        public void DeleteWorkspace(int workspaceId)
        {
            Workspace workspace = _workspaceRepository.GetWorkspace(workspaceId);
            _workspaceRepository.DeleteWorkspace(workspace);
        }
    }
}
