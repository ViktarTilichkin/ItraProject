using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Models.Repository;

namespace Server.Services
{
    public class UserService
    {

        public UserService()
        {
        }
        public async Task<List<UserEntity>> GetAll()
        {
            return null;
        }
        public async Task<UserEntity> GetById(int id)
        {
            return null;
        }
        public async Task<UserEntity> Create(RegUser user)
        {
            UserEntity newUser = new UserEntity();
            newUser.Id = GetNextId();
            newUser.Name = user.Name;
            newUser.Email = user.Email;
            newUser.Pwd = user.Password;
            newUser.Role = "User";
            newUser.DateCreate = DateTime.Now;
            newUser.provaiderName = user.provaiderName;
            newUser.AccesToken = user.AccesToken;
            newUser.RefreshToken = user.RefreshToken;
            newUser.ExpirationTime = "1111";
            using (AppDbContent db = new AppDbContent())
            {
                db.User.AddRange(newUser);
                db.SaveChanges();
            }
            return newUser;
        }
        public async Task<UserEntity> Update(UserEntity user)
        {
            return null;
        }
        public async Task<bool> Delete(int id)
        {
            return true;
        }

        public async Task<UserEntity> GetUserByEmail(string email)
        {
            if (email == null) throw new ArgumentNullException(nameof(email));
            UserEntity user = new UserEntity();
            using (AppDbContent db = new AppDbContent())
            {
                user = await db.User.FirstOrDefaultAsync(x => x.Email.ToLower() == email.ToLower());
            }
            return user;
        }
        private int GetNextId()
        {
            UserEntity id = new UserEntity();
            using (AppDbContent db = new AppDbContent())
            {
                id = db.User
             .OrderByDescending(u => u.Id)
             .FirstOrDefault();
            }
            return id == null ? 1 : id.Id + 1;
        }
    }
}
