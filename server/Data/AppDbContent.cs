using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Repository;

namespace Server.Data
{
    public class AppDbContent : DbContext
    {
        public DbSet<UserEntity> User { get; set; } = null!;
        public DbSet<Review> Reviews { get; internal set; }

        public AppDbContent()
        {
            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("server=localhost;database=ItraDB;uid=root;password=Nastya94#;",
                new MySqlServerVersion(new Version(8, 0, 25)));
        }
    }
}
