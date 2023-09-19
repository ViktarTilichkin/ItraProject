namespace Server.Models
{
    public class RegUser
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string provaiderName { get; set; }
        public string AccesToken { get; set; }
        public string ExpirationTime { get; set; }
        public string RefreshToken { get; set; }
    }
}
