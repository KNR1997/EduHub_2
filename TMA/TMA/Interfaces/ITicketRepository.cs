using TMA.Models;

namespace TMA.Interfaces
{
    public interface ITicketRepository
    {
        Ticket GetTicket(int taskId);

        bool SaveOrUpdateTicket(Ticket ticket);

        bool TicketExists(int taskId);

        bool DeleteTicket(Ticket ticket);

    }
}
