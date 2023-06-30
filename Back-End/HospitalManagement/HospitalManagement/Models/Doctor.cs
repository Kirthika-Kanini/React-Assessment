namespace HospitalManagement.Models
{
    public class Doctor
    {
        public int DoctorId { get; set; }
        public string? DoctorName { get; set; }
        public string? Gender { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public int? Experience { get; set; }
        public string? LicenseNumber {get; set;} 
        public string? Tesimonials { get; set; }
        public ICollection<Appointment>? Appointments { get; set; }
        public ICollection<Patient>? Patients { get; set; }
    }
}
