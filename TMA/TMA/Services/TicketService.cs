using AutoMapper;
using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Services
{
    public class TicketService
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IWorkspaceRepository _workspaceRepository;
        private readonly IUserRepository _userRepository;
        private readonly IColumnRepository _columnRepository;
        private readonly IMapper _mapper;

        public TicketService(ITicketRepository ticketRepository, IMapper mapper, IColumnRepository columnRepository, IUserRepository userRepository, IWorkspaceRepository workspaceRepository)
        {
            _ticketRepository = ticketRepository;
            _workspaceRepository = workspaceRepository;
            _userRepository = userRepository;
            _columnRepository = columnRepository;
            _mapper = mapper;
        }

        public void SaveOrUpdateTicket(TicketDto updateDTO)
        {
            Ticket ticket;
            bool isNew = (updateDTO.ticketID == 0);
            Workspace workspace = _workspaceRepository.GetWorkspace(updateDTO.workspaceID);
            User user = _userRepository.GetUserByID(updateDTO.userID);
            Column column = _columnRepository.GetColumn(updateDTO.columnID);

            if (!isNew)
            {
                ticket = _ticketRepository.GetTicket(updateDTO.ticketID);
            }
            else
            {
                ticket = new Ticket();
            }

            ticket.Title = updateDTO.ticketTitle;
            ticket.Description = updateDTO.ticketDescription;
            ticket.status = updateDTO.ticketStatus;
            ticket.user = user;
            ticket.Workspace = workspace;
            ticket.Column = column;

            _ticketRepository.SaveOrUpdateTicket(ticket);
        }

        public void DeleteTicket(int ticketID)
        {
              Ticket ticket = _ticketRepository.GetTicket(ticketID);
            _ticketRepository.DeleteTicket(ticket);
        }
    }
}
