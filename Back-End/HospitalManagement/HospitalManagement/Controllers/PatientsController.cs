using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagement.Models;
using HospitalManagement.Repository;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace HospitalManagement.Controllers
{
 
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly IPatient _patientRepository;

        public PatientsController(IPatient patientRepository)
        {
            _patientRepository = patientRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> Get()
        {
            var patients = await _patientRepository.GetPatients();
            return Ok(patients);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> Get(int id)
        {
            var patient = await _patientRepository.GetPatientById(id);
            if (patient == null)
            {
                return NotFound();
            }
            return Ok(patient);
        }
        
        [HttpPost]
        [Authorize(Roles ="patient")]
        public async Task<ActionResult<Patient>> Post([FromForm] Patient patient, IFormFile imageFile)
        {

            try
            {
                var createdPatient = await _patientRepository.CreatePatient(patient, imageFile);
                return CreatedAtAction("Get", new { id = createdPatient.PatientId }, createdPatient);

            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "patient")]
        public async Task<ActionResult<Patient>> Put(int id, [FromForm] Patient patient, IFormFile imageFile)
        {
            try
            {
                var updatedPat = await _patientRepository.UpdatePatient(id, patient, imageFile);
                return Ok(updatedPat);
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }
     
        [HttpDelete("{id}")]
        [Authorize(Roles = "patient")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _patientRepository.DeletePatient(id);
                if (result)
                {
                    return NoContent();
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                // Log the exception or perform any other desired error handling
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred.");
            }
        }
    }
}
