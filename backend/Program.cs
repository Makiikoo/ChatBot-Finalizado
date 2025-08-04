using Microsoft.EntityFrameworkCore;
using ChatBotAPI.Data;
using ChatBotAPI.Services;
using ChatBotAPI.Mapping;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

//  Configura CORS para permitir acesso do frontend (Vite na porta 5174)
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5174")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Configurações do projeto
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=chatbot.db"));

builder.Services.AddScoped<OpenAIService>();
builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});


var app = builder.Build();
app.UseCors("AllowLocalhost");


// Ativa Swagger no ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Aplica a política CORS definida acima
app.UseCors("PermitirFrontend");

app.UseAuthorization();

// Mapeia os endpoints dos controllers
app.MapControllers();

app.Run();
