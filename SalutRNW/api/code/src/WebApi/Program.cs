using System.Reflection;
using Application;
using Application.Abstractions.EventBus;
using Application.Abstractions.Tenant;
using Application.Behaviors;
using Application.Config;
using Application.Products.CreateProduct;
using Carter;
using Domain.Products;
using Infrastructure.MessageBroker;
using Marten;
using MassTransit;
using MediatR;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Serilog;
using Serilog.Events;
using Serilog.Exceptions;
using Serilog.Formatting.Json;
using WebApi.Extensions;
using WebApi.Middleware;

var myAllowSpecificOrigins = "_myAllowSpecificOrigins";

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: myAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins(
                    "http://localhost:3000",
                    "https://localhost:3000",
                    "https://reacteverywheretest.fly.dev/",
                    "https://reacteverywheredev.fly.dev/")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .AddEnvironmentVariables()
    .Build();

var name = Assembly.GetExecutingAssembly().GetName();
var logTo = Environment.GetEnvironmentVariable("LOGS_FOLDER");
logTo = string.IsNullOrEmpty(logTo) ? Path.Combine(Directory.GetCurrentDirectory(), "logs", "reacteverywhere-api.txt") : Path.Combine(logTo, "reacteverywhere-api.txt");

var logConfig = new LoggerConfiguration()
    .ReadFrom.Configuration(config);

var seqUrl = config["SeqUrl"];

logConfig.WriteTo.File(new JsonFormatter(), logTo, rollingInterval: RollingInterval.Day, restrictedToMinimumLevel: LogEventLevel.Information, shared: true);
logConfig.WriteTo.Seq(seqUrl!, restrictedToMinimumLevel: LogEventLevel.Information);

var logger = logConfig
    .Enrich.WithProperty("App", "ReactEverywhereApi")
    .Enrich.FromLogContext()
    .Enrich.WithProcessId()
    .Enrich.WithMachineName()
    .Enrich.WithExceptionDetails()
    .Enrich.WithProperty("Assembly", $"{name.Name}")
    .Enrich.WithProperty("Version", $"{name.Version}")
    .CreateLogger();

Log.Logger = logger;
builder.Logging.AddSerilog(logger);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthorization();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api Key Auth", Version = "v1" });
    c.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
    {
        Description = "ApiKey must appear in header",
        Type = SecuritySchemeType.ApiKey,
        Name = "x-api-key",
        In = ParameterLocation.Header,
        Scheme = "ApiKeyScheme"
    });
    var key = new OpenApiSecurityScheme()
    {
        Reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = "ApiKey"
        },
        In = ParameterLocation.Header
    };
    var requirement = new OpenApiSecurityRequirement
    {
        { key, new List<string>() }
    };
    c.AddSecurityRequirement(requirement);
});

builder.Services.AddOptions<AppSettings>()
    .BindConfiguration("Config")
    .ValidateDataAnnotations()
    .ValidateOnStart();

builder.Services.AddSingleton(sp =>
    sp.GetRequiredService<IOptions<AppSettings>>().Value);

builder.Services.AddHttpContextAccessor();

builder.Services.AddCarter();

builder.Services.AddMarten(options =>
{
    options.Schema.For<Product>().MultiTenanted();
    options.Connection(builder.Configuration.GetConnectionString("Database")!);
});

builder.Services.Configure<MessageBrokerSettings>(
    builder.Configuration.GetSection("MessageBroker"));

builder.Services.AddSingleton(sp =>
    sp.GetRequiredService<IOptions<MessageBrokerSettings>>().Value);

builder.Services.AddMassTransit(busConfigurator =>
{
    busConfigurator.SetKebabCaseEndpointNameFormatter();

    busConfigurator.AddConsumer<ProductCreatedEventConsumer>();

    busConfigurator.UsingRabbitMq((context, configurator) =>
    {
        MessageBrokerSettings settings = context.GetRequiredService<MessageBrokerSettings>();

        configurator.Host(new Uri(settings.Host), h =>
        {
            h.Username(settings.Username);
            h.Password(settings.Password);
        });

        configurator.ConfigureEndpoints(context);
    });
});

builder.Services.AddTransient<IEventBus, EventBus>();

builder.Services.AddScoped<ITenantProvider, TenantProvider>();

builder.Services.AddMediatR(ApplicationAssembly.Instance);

builder.Services.AddScoped(
    typeof(IPipelineBehavior<,>),
    typeof(LoggingPipelineBehavior<,>));

WebApplication app = builder.Build();

app.UseCors(myAllowSpecificOrigins);

app.AddGlobalErrorHandler();

Log.Information("Starting web host for ReactEverywhere API");
Log.Information("Logging to: {logTo}", logTo);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseMiddleware<ApiKeyMiddleware>();

app.MapCarter();

app.MapGet("/", () => Results.Ok());
app.MapGet("settings/config", (AppSettings settings) => Results.Ok(settings));

app.Run();
