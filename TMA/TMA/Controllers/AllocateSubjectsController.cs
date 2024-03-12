using Microsoft.AspNetCore.Mvc;
using TMA.Dtos;
using TMA.Services;

namespace TMA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AllocateSubjectsController : Controller
    {
        private readonly AllocateSubjectsService _allocateSubjectsService;

        public AllocateSubjectsController(AllocateSubjectsService allocateSubjectsService)
        {
            _allocateSubjectsService = allocateSubjectsService;
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult AllocateSubject([FromBody] AllocateSubjectDto allocateSubjectDto)
        {
            if (allocateSubjectDto == null)
                return BadRequest(ModelState);

            _allocateSubjectsService.AllocateSubject(allocateSubjectDto);

            return Ok("Successfully created");
        }

        [HttpGet]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public ActionResult<List<SubjectDto>> GetAllocatedSubjects(int teacherId)
        {

            List<SubjectDto> subjectDtos = _allocateSubjectsService.GetAllocatedSubjects(teacherId);

            return Ok(subjectDtos);
        }

        [HttpDelete]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult DeallocateSubject([FromBody] AllocateSubjectDto allocateSubjectDto)
        {
            if (allocateSubjectDto == null)
                return BadRequest(ModelState);

            _allocateSubjectsService.DeallocateSubject(allocateSubjectDto);

            return Ok("Successfully created");
        }
    }
}
