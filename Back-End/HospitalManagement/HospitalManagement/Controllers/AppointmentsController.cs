using HospitalManagement.Models;
using HospitalManagement.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HospitalManagement.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly IAppointment _appointmentRepository;

        public AppointmentsController(IAppointment appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            return await _appointmentRepository.GetAppointments();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            return await _appointmentRepository.GetAppointment(id);
        }
        [Authorize(Roles ="Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppointment(int id, Appointment appointment)
        {
            return await _appointmentRepository.PutAppointment(id, appointment);
        }
        [Authorize(Roles = "patient")]
        [HttpPost]
        public async Task<ActionResult<Appointment>> PostAppointment(Appointment appointment)
        {
            return await _appointmentRepository.PostAppointment(appointment);
        }
        [Authorize(Roles = "patient,Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            return await _appointmentRepository.DeleteAppointment(id);
        }
    }
}
