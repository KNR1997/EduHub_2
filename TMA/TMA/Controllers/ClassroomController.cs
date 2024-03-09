using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TMA.Dtos;
using TMA.Repository;
using TMA.Services;

namespace TMA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClassroomController : Controller
    {
        private readonly ClassroomService _classroomService;

        public ClassroomController(ClassroomService classroomService) 
        {
            _classroomService = classroomService;
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult SaveOrUpdateClassroom([FromBody] ClassroomDto classroomDto)
        {
            if (classroomDto == null)
                return BadRequest(ModelState);

            _classroomService.SaveOrUpdateClassroom(classroomDto);

            return Ok("Successfully created");
        }

        [HttpDelete]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult DeleteClassroom(int classroomId)
        {

            _classroomService.DeleteClassroom(classroomId);
            return Ok("Successfully deleted");
        }
    }
}
