namespace TMA.Dtos
{
    public class TeacherDto
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required int ContactNo { get; set; }
        public required string Email { get; set; }
    }
}
