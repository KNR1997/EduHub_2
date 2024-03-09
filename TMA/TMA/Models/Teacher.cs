namespace TMA.Models
{
    public class Teacher
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int? ContactNo { get; set; }
        public string? Email { get; set; }
        public ICollection<Classroom>? Classrooms { get; set; } = new List<Classroom>();
        public ICollection<Subject>? Subjects { get; set; } = new List<Subject>();
    }
}
