using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Models.Repository;
using BCrypt.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class UserService
    {
        private readonly AppDbContent _dbContext;

        public UserService(AppDbContent dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<UserEntity>> GetAll()
        {
            return await _dbContext.User.ToListAsync();
        }

        public async Task<UserEntity> GetById(int id)
        {
            return await _dbContext.User.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<UserEntity> Create(RegUser user)
        {
            UserEntity newUser = new UserEntity
            {
                Id = GetNextId(),
                Name = user.Name,
                Email = user.Email,
                Pwd = BCrypt.Net.BCrypt.HashPassword(user.Password),
                Role = "User",
                DateCreate = DateTime.Now,
                provaiderName = user.provaiderName,
                AccesToken = user.AccesToken,
                RefreshToken = user.RefreshToken,
                ExpirationTime = "1111"
            };

            _dbContext.User.Add(newUser);
            await _dbContext.SaveChangesAsync();

            return newUser;
        }

        public async Task<UserEntity> Update(UserEntity user)
        {
            var updateUser = await _dbContext.User.FirstOrDefaultAsync(u => u.Id == user.Id);

            if (updateUser == null)
            {
                return null; 
            }

            updateUser.Name = user.Name;
            updateUser.Email = user.Email;
            updateUser.Pwd = BCrypt.Net.BCrypt.HashPassword(user.Pwd);

            await _dbContext.SaveChangesAsync();
            return updateUser;
        }

        public async Task<bool> Delete(int id)
        {
            var userToDelete = await _dbContext.User.FirstOrDefaultAsync(u => u.Id == id);

            if (userToDelete == null)
            {
                return false;
            }

            _dbContext.User.Remove(userToDelete);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<UserEntity> GetUserByEmail(string email)
        {
            if (email == null) throw new ArgumentNullException(nameof(email));
            return await _dbContext.User.FirstOrDefaultAsync(x => x.Email.ToLower() == email.ToLower());
        }

        private int GetNextId()
        {
            var lastUser = _dbContext.User.OrderByDescending(u => u.Id).FirstOrDefault();
            return lastUser == null ? 1 : lastUser.Id + 1;
        }
    }
}
