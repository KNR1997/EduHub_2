using AutoMapper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using TMA.Data;
using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    [ApiController]
    public class WorkspaceController : Controller
    {
        private readonly IWorkspaceRepository _workspaceRepository;
        private readonly IMapper _mapper;

        public WorkspaceController(IWorkspaceRepository workspaceRepository, IMapper mapper)
        {
            _workspaceRepository = workspaceRepository;
            _mapper = mapper;
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateWorkspaces([FromBody] WorkspaceDto workspaceDto)
        {
            if (workspaceDto == null)
                return BadRequest(ModelState);

            _workspaceRepository.CreateWorkspace(workspaceDto.Name);

            return Ok("Successfully created");
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Workspace>))]
        public IActionResult GetWorkspaces()
        {
            var workspaces = _mapper.Map<List<WorkspaceDto>>(_workspaceRepository.GetWorkspaces());

            if (!ModelState.IsValid)
                return BadRequest(workspaces);

            return Ok(workspaces);
        }

        [HttpGet("{workspaceId}")]
        [ProducesResponseType(200, Type = typeof(Workspace))]
        [ProducesResponseType(400)]
        public IActionResult GetWorkspace(int workspaceId)
        {
            if (!_workspaceRepository.WorkspaceExists(workspaceId))
                return NotFound();

            var workspaces = _mapper.Map<List<WorkspaceDto>>(_workspaceRepository.GetWorkspace(workspaceId));

            if (!ModelState.IsValid)
                return BadRequest(workspaces);

            return Ok(workspaces);
        }
    }
}
