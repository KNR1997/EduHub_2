using Microsoft.AspNetCore.Mvc;
using TMA.Dtos;
using TMA.Services;

namespace TMA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TeacherController : Controller
    {
        private readonly TeacherService _teacherService;

        public TeacherController(TeacherService teacherService)
        {
            _teacherService = teacherService;
        }

        [HttpGet]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public ActionResult<List<TeacherDto>> GetAllTeachers()
        {

            List<TeacherDto> teacherDtos = _teacherService.GetAllTeachers();

            return Ok(teacherDtos);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult SaveOrUpdateTeacher([FromBody] TeacherDto teacherDto)
        {
            if (teacherDto == null)
                return BadRequest(ModelState);

            _teacherService.SaveOrUpdateTeacher(teacherDto);

            return Ok("Successfully created");
        }

        [HttpDelete]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult DeleteTeacher(int teacherId)
        {
            _teacherService.DeleteTeacher(teacherId);
            return Ok("Successfully deleted");
        }
    }
}
