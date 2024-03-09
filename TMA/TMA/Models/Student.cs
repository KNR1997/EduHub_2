namespace TMA.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ContactPerson { get; set; }
        public int ContactNo { get; set; }
        public string Email { get; set; }
        public DateTime Dob { get; set; }
        public int Age { get; set; }
        public int ClassroomId { get; set; }
        public string ClassroomName { get; set; }
        public Classroom Classroom { get; set; }
    }
}
