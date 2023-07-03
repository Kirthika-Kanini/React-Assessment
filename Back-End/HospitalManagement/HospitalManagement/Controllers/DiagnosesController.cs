using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagement.Models;

namespace HospitalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiagnosesController : ControllerBase
    {
        private readonly DoctorPatientContext _context;

        public DiagnosesController(DoctorPatientContext context)
        {
            _context = context;
        }

        // GET: api/Diagnoses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Diagnose>>> GetDiagnoses()
        {
          if (_context.Diagnoses == null)
          {
              return NotFound();
          }
            return await _context.Diagnoses.ToListAsync();
        }

        // GET: api/Diagnoses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Diagnose>> GetDiagnose(int id)
        {
          if (_context.Diagnoses == null)
          {
              return NotFound();
          }
            var diagnose = await _context.Diagnoses.FindAsync(id);

            if (diagnose == null)
            {
                return NotFound();
            }

            return diagnose;
        }

        // PUT: api/Diagnoses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDiagnose(int id, Diagnose diagnose)
        {
            if (id != diagnose.Id)
            {
                return BadRequest();
            }

            _context.Entry(diagnose).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiagnoseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Diagnoses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Diagnose>> PostDiagnose(Diagnose diagnose)
        {
          if (_context.Diagnoses == null)
          {
              return Problem("Entity set 'DoctorPatientContext.Diagnoses'  is null.");
          }
            _context.Diagnoses.Add(diagnose);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDiagnose", new { id = diagnose.Id }, diagnose);
        }

        // DELETE: api/Diagnoses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiagnose(int id)
        {
            if (_context.Diagnoses == null)
            {
                return NotFound();
            }
            var diagnose = await _context.Diagnoses.FindAsync(id);
            if (diagnose == null)
            {
                return NotFound();
            }

            _context.Diagnoses.Remove(diagnose);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DiagnoseExists(int id)
        {
            return (_context.Diagnoses?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
