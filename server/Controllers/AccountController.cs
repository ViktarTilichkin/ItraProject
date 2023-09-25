using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Server.Models.ApiRequest;
using Server.Models.Options;
using Server.Services;
using Server.Models.ApiResponse;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly AccountService m_AccountService;
        public AccountController(AccountService service)
        {
            m_AccountService = service;
        }
        [HttpPost("[action]")]
        public async Task<LoginResponse> Login(LoginRequest user)
        {
            return await m_AccountService.Token(user.Email, user.Password);
        }
        //[HttpPost("[action]")]
        //public async Task<bool> RestoreToken(string token)
        //{
        //    return m_AccountService.GetIdTokenExpiry(token);
        //}
        [HttpPost("[action]")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }
    }
}
