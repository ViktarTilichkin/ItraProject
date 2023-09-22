﻿using Server.Models.Options;

namespace Server.Models.ApiResponse
{
    public class LoginResponse
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }

        public TokenData TokenData { get; set; }
    }
}
