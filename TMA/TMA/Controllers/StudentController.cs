using Microsoft.AspNetCore.Mvc;
using TMA.Dtos;
using TMA.Dtos.FormDtos;
using TMA.Dtos.PageDtos;
using TMA.Models;
using TMA.Services;

namespace TMA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : Controller
    {
        private readonly StudentService _studentService;

        public StudentController(StudentService studentService) 
        {
            _studentService = studentService;
        }

        [HttpGet]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public ActionResult<List<StudentPageDto>> GetAllStudent()
        {

            List<StudentPageDto> studentPageDtos = _studentService.GetAllStudents();

            return Ok(studentPageDtos);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult SaveOrUpdateStudent([FromBody] StudentFormDto studentFormDto)
        {
            if (studentFormDto == null)
                return BadRequest(ModelState);

            _studentService.SaveOrUpdateStudent(studentFormDto);

            return Ok("Successfully created");
        }

        [HttpDelete]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult DeleteStudent(int studentId)
        {
            _studentService.DeleteClassroom(studentId);
            return Ok("Successfully deleted");
        }

        [HttpGet("{studentId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public ActionResult<StudentReportDto> GetStudentReport(int studentId)
        {
            // Call the service method with the provided student ID
            StudentReportDto studentReportDto = _studentService.GetStudentReport(studentId);

            if (studentReportDto != null)
            {
                // Return a successful response with the report data
                return Ok(studentReportDto);
            }
            else
            {
                // Return a 400 Bad Request response if something went wrong
                return BadRequest("Failed to create the report");
            }
        }
    }
}
