using Microsoft.EntityFrameworkCore;
using HospitalManagement.Models;

namespace HospitalManagement.Models
{
    public class DoctorPatientContext:DbContext
    {
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet <Appointment> Appointments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Diagnose> Diagnoses { get; set; }
        public DoctorPatientContext(DbContextOptions<DoctorPatientContext> options) : base(options)
        {

        }

    }
}
