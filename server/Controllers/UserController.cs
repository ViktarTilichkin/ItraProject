using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Server.Data;
using Server.Models;
using Server.Models.Repository;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService m_Service;

        public UserController(UserService rep)
        {
            m_Service = rep;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{i}")]
        public async Task<IActionResult> GetByID(int id)
        {
            try
            {
                var users = new List<UserEntity>();
                using (AppDbContent db = new AppDbContent())
                {
                    users = db.User.ToList();
                    Console.WriteLine("Список объектов:");
                    foreach (UserEntity u in users)
                    {
                        Console.WriteLine($"{u}");
                    }
                }
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser(RegUser user)
        {
            try
            {
                return Ok(await m_Service.Create(user));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser()
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
