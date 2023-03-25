using System.Net;
using System.Runtime;
using System.Text.Json;
using Application.Config;
using Microsoft.VisualBasic;
using Presentation.ApplicationErrors.Exceptions;
using KeyNotFoundException = Presentation.ApplicationErrors.Exceptions.KeyNotFoundException;
using NotImplementedException = System.NotImplementedException;
using UnauthorizedAccessException = System.UnauthorizedAccessException;

namespace WebApi.Middleware;

public class GlobalErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalErrorHandlingMiddleware> _logger;
    private readonly AppSettings _settings;

    public GlobalErrorHandlingMiddleware(
        RequestDelegate next,
        ILogger<GlobalErrorHandlingMiddleware> logger,
        AppSettings settings)
    {
        _next = next;
        _logger = logger;
        _settings = settings;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        HttpStatusCode status;
        var stackTrace = string.Empty;
        string message;

        var exceptionType = exception.GetType();

        if (exceptionType == typeof(BadRequestException))
        {
            message = exception.Message;
            status = HttpStatusCode.BadRequest;
            stackTrace = exception.StackTrace;
            _logger.LogError(exception, "BadRequest {Message}", exception.Message);
        }
        else if (exceptionType == typeof(NotFoundException))
        {
            message = exception.Message;
            status = HttpStatusCode.NotFound;
            stackTrace = exception.StackTrace;
            _logger.LogError(exception, "NotFound {Message}", exception.Message);
        }
        else if (exceptionType == typeof(NotImplementedException))
        {
            status = HttpStatusCode.NotImplemented;
            message = exception.Message;
            stackTrace = exception.StackTrace;
            _logger.LogError(exception, "NotImplemented {Message}", exception.Message);
        }
        else if (exceptionType == typeof(UnauthorizedAccessException))
        {
            status = HttpStatusCode.Unauthorized;
            message = exception.Message;
            stackTrace = exception.StackTrace;
            _logger.LogError(exception, "Unauthorized {Message}", exception.Message);
        }
        else if (exceptionType == typeof(KeyNotFoundException))
        {
            status = HttpStatusCode.BadRequest;
            message = exception.Message;
            stackTrace = exception.StackTrace;
            _logger.LogError(exception, "KeyNotFoundException {Message}", exception.Message);
        }
        else
        {
            status = HttpStatusCode.InternalServerError;
            message = exception.Message;
            stackTrace = exception.StackTrace;
            _logger.LogError(exception, "InternalServerError {Message}", exception.Message);
        }

        if (!_settings.PublishProductEvents)
        {
            stackTrace = string.Empty;
        }

        var exceptionResult = JsonSerializer.Serialize(new { error = message, stackTrace });
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)status;

        return context.Response.WriteAsync(exceptionResult);
    }
}
