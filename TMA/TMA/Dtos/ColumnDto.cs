namespace TMA.Dtos
{
    public class ColumnDto
    {
        public int ColumnId { get; set; }
        public required string ColumnName { get; set; }
        public int WorkspaceId { get; set; }
    }
}
