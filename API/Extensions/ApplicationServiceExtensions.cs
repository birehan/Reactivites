using Persistence;
using Application.Core;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using MediatR;
using  Application.Activities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions 
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config){

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);


            // dotnet add package Microsoft.EntityFrameworkCore.InMemory
            // using Microsoft.EntityFrameworkCore;
            services.AddDbContext<DataContext>(options =>
                options.UseNpgsql(config.GetConnectionString("DefaultConnection")));

            services.AddCors(options => {
                options.AddPolicy("CorsPolicy", policy =>
                policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000"));
            });

            services.AddMediatR(typeof(List.Handler));

            return services;
        }
    }
}