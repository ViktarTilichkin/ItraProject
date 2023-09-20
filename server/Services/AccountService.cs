using Microsoft.IdentityModel.Tokens;
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
        private readonly JwtSecurityTokenHandler tokenHandler;
        private readonly string secretKey; // Секретный ключ для создания и валидации токенов

        //public AccountService(string secretKey)
        //{
        //    this.tokenHandler = new JwtSecurityTokenHandler();
        //    this.secretKey = secretKey;
        //}

        public (string AccessToken, string RefreshToken) Login(string email, string password)
        {
            // Проверка существования пользователя с email и паролем
            bool userExists = GetIdentifi(email, password);

            if (!userExists)
            {
                throw new InvalidOperationException("Пользователь с указанными email и паролем не найден.");
            }

            // Генерация Access и Refresh токенов
            string accessToken = GenerateAccessToken(email);
            string refreshToken = GenerateRefreshToken();

            return (accessToken, refreshToken);
        }

        public (string AccessToken, string RefreshToken) ResetToken(string accessToken, string refreshToken)
        {
            // Проверка срока действия Refresh токена
            bool refreshTokenValid = true;

            if (!refreshTokenValid)
            {
                throw new InvalidOperationException("Срок действия Refresh токена истек.");
            }

            // Генерация новой пары Access и Refresh токенов
            string newAccessToken = GenerateAccessToken(GetEmailFromToken(accessToken));
            string newRefreshToken = GenerateRefreshToken();

            return (newAccessToken, newRefreshToken);
        }

        private bool GetIdentifi(string email, string password)
        {
            // Ваша логика проверки существования пользователя по email и паролю
            // Верните true, если пользователь существует, и false в противном случае
            // Замените этот метод на реальную реализацию
            // Пример:
            // if (ПроверкаПользователя(email, password))
            // {
            //     return true;
            // }
            // else
            // {
            //     return false;
            // }
            throw new NotImplementedException();
        }

        private string GenerateAccessToken(string email)
        {
            var claims = new ClaimsIdentity(new[]
            {
            new Claim(ClaimTypes.Email, email),
            // Другие утверждения (claims) по вашему усмотрению
        });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddMinutes(15), // Время жизни Access токена
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Convert.FromBase64String(secretKey)), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            // Генерация Refresh токена
            // Этот метод может быть реализован в соответствии с вашими требованиями
            // Здесь просто возвращается случайная строка в качестве примера
            return Guid.NewGuid().ToString();
        }
        
        
        private string GetEmailFromToken(string token)
        {
            var jwtToken = tokenHandler.ReadJwtToken(token);
            var emailClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);

            if (emailClaim != null)
            {
                return emailClaim.Value;
            }

            return null;
        }
        private readonly UserService m_Service;

        public AccountService(UserService service)
        {
            m_Service = service;
        }
        public async Task<TokenData> Token(string email, string password)
        {
            var identity = await GetIdentity(email, password);
            if (identity == null) return new TokenData() { Message = "Invalid email or password." };
            var now = DateTime.UtcNow;
            // создаем JWT-токен
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
            return new TokenData() { AccessToken = encodedJwtAccess, RefreshToken = encodedJwtRefresh };
        }

        //public async Task<TokenData> GetToken(string email, string password)
        //{
        //    return new TokenData();
        //}
        private bool GetIdTokenExpiry(string idtoken)
        {
            var token = new JwtSecurityToken(jwtEncodedString: idtoken);
            string expiry = token.Claims.First(c => c.Type == "exp").Value;
            DateTime dateTime = DateTimeOffset.FromUnixTimeSeconds(long.Parse(expiry)).DateTime; ;
            return dateTime > DateTime.UtcNow ? true : false;
        }
        private async Task<ClaimsIdentity> GetIdentity(string email, string password)
        {
            UserEntity user = await m_Service.GetUserByEmail(email);
            if (user == null) return null; // если пользователя не найдено
            if (!user.Pwd.Equals(password)) return null;
            var claims = new List<Claim> {
            new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
            new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role  == "User" ? "User" : "Admin" )};
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(
            claims,
            "Token",
            ClaimsIdentity.DefaultNameClaimType,
            ClaimsIdentity.DefaultRoleClaimType
            );
            return claimsIdentity;
        }

    }
}
