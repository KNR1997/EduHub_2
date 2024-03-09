namespace TMA.Dtos
{
    public class StudentReportDto
    {
        public StudentReportDto() { }
        public string FullName { get; set; }
        public string Classroom { get; set; }
        public string ContactPerson { get; set; }
        public int ContactNo { get; set; }
        public string Email { get; set; }
        public DateTime Dob { get; set; }
        public Dictionary<string, string> TeacherSubjectsMap { get; set; } = new Dictionary<string, string>();
    }
}
