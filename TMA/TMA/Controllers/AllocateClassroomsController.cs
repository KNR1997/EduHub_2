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
        public IActionResult AllocateClassrooms([FromBody] AllocateClassroomDto allocateClassroomsDto)
        {
            if (allocateClassroomsDto == null)
                return BadRequest(ModelState);

            _allocateClassroom.AllocateClassrooms(allocateClassroomsDto);

            return Ok("Successfully created");
        }

        [HttpGet]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public ActionResult<List<ClassroomDto>> GetAllocatedClassrooms(int teacherId)
        {

            List<ClassroomDto> classroomDtos = _allocateClassroom.GetAllocatedSubjects(teacherId);

            return Ok(classroomDtos);
        }

        [HttpDelete]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult DeallocateClassroom([FromBody] AllocateClassroomDto allocateClassroomDto)
        {
            if (allocateClassroomDto == null)
                return BadRequest(ModelState);

            _allocateClassroom.DeallocateClassroom(allocateClassroomDto);

            return Ok("Successfully deallocated classroom");
        }

    }
}
