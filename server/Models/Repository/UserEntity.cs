namespace Server.Models.Repository
{
    public class UserEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Pwd { get; set; }
        public DateTime DateCreate { get; set; }
        public string Role { get; set; }
        public string provaiderName { get; set; }
        public string AccesToken { get; set; }
        public string ExpirationTime { get; set; }
        public string RefreshToken { get; set; }

        public override string ToString()
        {
            return $"{Name} {Email}";
        }
    }
}
