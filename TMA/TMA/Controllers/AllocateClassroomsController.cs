using Microsoft.AspNetCore.Mvc;
using TMA.Dtos;
using TMA.Services;

namespace TMA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AllocateClassroomsController : Controller
    {
        private readonly AllocateClassroomService _allocateClassroom;

        public AllocateClassroomsController(AllocateClassroomService allocateClassroom)
        {
            _allocateClassroom = allocateClassroom;
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult AllocateClassrooms([FromBody] AllocateClassroomsDto allocateClassroomsDto)
        {
            if (allocateClassroomsDto == null)
                return BadRequest(ModelState);

            _allocateClassroom.AllocateClassrooms(allocateClassroomsDto);

            return Ok("Successfully created");
        }

    }
}
