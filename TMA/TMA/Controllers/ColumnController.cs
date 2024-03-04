using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using TMA.Dtos;
using TMA.Services;
using TMA.Interfaces;

namespace TMA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ColumnController : Controller
    {
        private readonly ColumnService _columnService;
        private readonly IColumnRepository _columnRepository;

        public ColumnController(ColumnService columnService, IColumnRepository columnRepository)
        {
            _columnService = columnService;
            _columnRepository = columnRepository;

        }

        [HttpPost, Authorize]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult SaveOrUpdateColumn([FromBody] ColumnDto columnDto)
        {
            if (columnDto == null)
                return BadRequest(ModelState);

            _columnService.SaveOrUpdateColumn(columnDto);

            return Ok("Successfully created");
        }

        [HttpDelete, Authorize]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult DeleteColumn(int columnId)
        {
            if (!_columnRepository.ColumnExists(columnId))
            {
                return NotFound();
            } else
            {
                _columnService.DeleteColumn(columnId);
            }

            return Ok("Successfully deleted");
        }

    }
}
