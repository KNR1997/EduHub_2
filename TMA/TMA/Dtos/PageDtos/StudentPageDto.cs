namespace TMA.Dtos.PageDtos
{
    public class StudentPageDto
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string ContactPerson { get; set; }
        public required int ContactNo { get; set; }
        public required string Email { get; set; }
        public required DateTime Dob { get; set; }
        public required int Age { get; set; }
        public required string ClassroomName { get; set; }
    }
}
