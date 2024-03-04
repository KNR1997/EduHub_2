using Microsoft.EntityFrameworkCore;
using TMA.Data;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Repository
{
    public class TicketRepository : ITicketRepository
    {
        private readonly DataContext _context;

        public TicketRepository(DataContext context)
        {
            _context = context;
        }

        public Ticket GetTicket(int id)
        {
            return _context.Tickets.Where(w => w.Id == id).FirstOrDefault();
        }

        public bool SaveOrUpdateTicket(Ticket ticket)
        {
            if (ticket.Id == 0)
            {
                _context.Add(ticket);
            }
            else
            {
                _context.Update(ticket);
            }

            return Save();
        }

        public bool TicketExists(int taskId)
        {
            return _context.Columns.Any(w => w.Id == taskId);
        }

        public bool DeleteTicket(Ticket ticket)
        {
            _context.Remove(ticket);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
