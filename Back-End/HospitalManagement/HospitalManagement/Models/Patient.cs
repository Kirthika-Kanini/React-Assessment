namespace HospitalManagement.Models
{
    public class Patient
    {
        public int PatientId { get; set; }
        public string ?PatientName { get; set;}
        public string ?Gender { get; set;}
        public string ?Email { get; set;}
        public string ?Phone { get; set;}
        public string ?Address { get; set;}
        public string ?MedicalHistory { get; set;}   
        public string ?BloodGroup { get; set;}   
        public string ?PreferredLanguage { get; set;}
       
    }
}
