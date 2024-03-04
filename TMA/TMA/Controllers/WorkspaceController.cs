using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;
using TMA.Services;

namespace TMA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WorkspaceController : Controller
    {
        private readonly IWorkspaceRepository _workspaceRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly WorkspaceService _workspaceService;

        public WorkspaceController(IWorkspaceRepository workspaceRepository, IMapper mapper, IUserRepository userRepository, WorkspaceService workspaceService)
        {
            _workspaceRepository = workspaceRepository;
            _mapper = mapper;
            _userRepository = userRepository;
            _workspaceService = workspaceService;
        }

        [HttpPost, Authorize]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult SaveOrUpdateWorkspaces([FromBody] WorkspaceDto workspaceDto)
        {
            if (workspaceDto == null)
                return BadRequest(ModelState);

            var userName = User.Identity?.Name;
            _workspaceService.SaveOrUpdateWorkspace(workspaceDto, userName);

            return Ok("Successfully created");
        }

        [HttpGet, Authorize]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Workspace>))]
        public IActionResult GetWorkspacesByUser()
        {
            var userName = User.Identity?.Name;

            var userModel = _userRepository.GetUser(userName);

            var workspaces = _mapper.Map<List<WorkspaceDto>>(_workspaceRepository.GetWorkspaceByUser(userModel));

            if (!ModelState.IsValid)
                return BadRequest(workspaces);

            return Ok(workspaces);
        }

        [HttpDelete, Authorize]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult DeleteWorkspace(int workspaceId)
        {
            if (!_workspaceRepository.WorkspaceExists(workspaceId))
            {
                return NotFound();
            } else
            {
                _workspaceService.DeleteWorkspace(workspaceId);
            }

            return Ok("Successfully deleted");
        }
    }
}
