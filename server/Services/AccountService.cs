using Microsoft.IdentityModel.Tokens;
using Server.Models.ApiResponse;
using Server.Models.Options;
using Server.Models.Repository;
using Server.Options;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Server.Services
{
    public class AccountService
    {

        private readonly UserService m_Service;

        public AccountService(UserService service)
        {
            m_Service = service;
        }
        public async Task<LoginResponse> Token(string email, string password)
        {
            LoginResponse respons = new LoginResponse();
            (var identity, var user) = await GetIdentity(email, password);
            if (identity == null) return respons;
            var now = DateTime.UtcNow;
            var AccessJWT = new JwtSecurityToken(
            issuer: AuthOptions.ISSUER,
            audience: AuthOptions.AUDIENCE,
            notBefore: now,
            claims: identity.Claims,
            expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
            signingCredentials: new SigningCredentials(
            AuthOptions.GetSymmetricSecurityKey(),
            SecurityAlgorithms.HmacSha256)
            );
            var RefreshJWT = new JwtSecurityToken(
            issuer: AuthOptions.ISSUER,
            audience: AuthOptions.AUDIENCE,
            notBefore: now,
            claims: identity.Claims,
            expires: now.Add(TimeSpan.FromMinutes(43200)),
            signingCredentials: new SigningCredentials(
            AuthOptions.GetSymmetricSecurityKey(),
            SecurityAlgorithms.HmacSha256)
            );
            var encodedJwtAccess = new JwtSecurityTokenHandler().WriteToken(AccessJWT);
            var encodedJwtRefresh = new JwtSecurityTokenHandler().WriteToken(RefreshJWT);
            respons.Name = user.Name; respons.Email = user.Email; respons.TokenData = new TokenData() { AccessToken = encodedJwtAccess, RefreshToken = encodedJwtRefresh }; respons.Role = user.Role;
            return respons;
        }
        private bool GetIdTokenExpiry(string idtoken)
        {
            var token = new JwtSecurityToken(jwtEncodedString: idtoken);
            string expiry = token.Claims.First(c => c.Type == "exp").Value;
            DateTime dateTime = DateTimeOffset.FromUnixTimeSeconds(long.Parse(expiry)).DateTime; ;
            return dateTime > DateTime.UtcNow ? true : false;
        }
        private async Task<(ClaimsIdentity, UserEntity)> GetIdentity(string email, string password)
        {
            UserEntity user = await m_Service.GetUserByEmail(email);
            if (user == null) return (null, null); // если пользователя не найдено
            if (!BCrypt.Net.BCrypt.EnhancedVerify(password, user.Pwd)) return (null, null);
            //if (!user.Pwd.Equals(password)) return (null, null);
            var claims = new List<Claim> {
            new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
            new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role  == "User" ? "User" : "Admin" )};
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(
            claims,
            "Token",
            ClaimsIdentity.DefaultNameClaimType,
            ClaimsIdentity.DefaultRoleClaimType
            );
            return (claimsIdentity, user);
        }

    }
}
