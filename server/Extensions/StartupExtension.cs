﻿using MySql.Data.MySqlClient;
using Server.Services;

namespace Server.Extensions
{
    public static class StartupExtension
    {
        public static void AddRepositories(this IServiceCollection services, string connectionString)
        {
            services.AddSingleton(_ => new MySqlConnection(connectionString));
        }

        public static void AddServices(this IServiceCollection services)
        {
            services.AddTransient<UserService>();

        }
    }
}
