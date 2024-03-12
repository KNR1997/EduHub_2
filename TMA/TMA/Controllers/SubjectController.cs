using Microsoft.AspNetCore.Mvc;
using TMA.Dtos;
using TMA.Services;

namespace TMA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SubjectController : Controller
    {
        private readonly SubjectService _subjectService;

        public SubjectController(SubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        [HttpGet]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public ActionResult<List<SubjectDto>> GetAllSubjects()
        {

            List<SubjectDto> subjectDtos = _subjectService.GetAllSubjects();

            return Ok(subjectDtos);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult SaveOrUpdateSubject([FromBody] SubjectDto subjectDto)
        {
            if (subjectDto == null)
                return BadRequest(ModelState);

            _subjectService.SaveOrUpdateSubject(subjectDto);

            return Ok("Successfully created");
        }

        [HttpDelete]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult DeleteSubject(int subjectId)
        {
            _subjectService.DeleteSubject(subjectId);
            return Ok("Successfully deleted");
        }
    }
}
