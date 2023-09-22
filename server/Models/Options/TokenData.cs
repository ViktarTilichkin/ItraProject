namespace Server.Models.Options
{
    public class TokenData
    {
        public string AccessToken { get; set; }
        public string Message { get; set; } = "Invalid email or password.";

        public string RefreshToken { get; set; }

    }
}
