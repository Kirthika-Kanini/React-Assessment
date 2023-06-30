namespace HospitalManagement.Models
{
    public class Appointment
    {
        public int AppointmentId { get; set; }
        public string? PatientName { get; set; }
        public string? Date { get; set; }
        public string? Time { get; set; }
        public string? ReasonForVisit { get; set; }
        public string? Status { get; set; }

        public Doctor? Doctor { get; set; }

    }
}
