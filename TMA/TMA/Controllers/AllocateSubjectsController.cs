using Microsoft.AspNetCore.Mvc;
using TMA.Dtos;
using TMA.Services;

namespace TMA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AllocateSubjectsController : Controller
    {
        private readonly AllocateClassroomService _allocateClassroomService;

        public AllocateSubjectsController(AllocateClassroomService allocateClassroomService)
        {
            _allocateClassroomService = allocateClassroomService;
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult AllocateClassrooms([FromBody] AllocateClassroomsDto allocateClassroomsDto)
        {
            if (allocateClassroomsDto == null)
                return BadRequest(ModelState);

            _allocateClassroomService.AllocateClassrooms(allocateClassroomsDto);

            return Ok("Successfully created");
        }
    }
}
