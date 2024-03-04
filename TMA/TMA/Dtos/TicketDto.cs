namespace TMA.Dtos
{
    public class TicketDto
    {
        public int ticketID { get; set; }

        public required string ticketTitle { get; set; }

        public string ticketDescription { get; set; }

        public string ticketStatus { get; set; }

        public string userID { get; set; }

        public int workspaceID { get; set; }

        public int columnID { get; set; }

    }
}
