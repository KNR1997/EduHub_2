using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;
using TMA.Services;

namespace TMA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TicketController : Controller
    {
        private readonly TicketService _ticketService;

        public TicketController(TicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [HttpPost, Authorize]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult SaveOrUpdateTask([FromBody] TicketDto ticketDto)
        {
            if (ticketDto == null)
                return BadRequest(ModelState);

            _ticketService.SaveOrUpdateTicket(ticketDto);

            return Ok("Successfully created");
        }

        [HttpDelete, Authorize]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult DeleteTask(int ticketID)
        {
            _ticketService.DeleteTicket(ticketID);
            return Ok("Successfully deleted");
        }
    }
}
