namespace WebApi.Middleware;

public class ApiKeyMiddleware
{
    private const string ApiKeyHeader = "x-api-key";
    private const string ApiKeyConfig = "XApiKey";

    private readonly RequestDelegate _next;

    public ApiKeyMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Path.Equals("/", StringComparison.InvariantCultureIgnoreCase)
            || context.Request.Path.Equals("/favicon.ico", StringComparison.InvariantCultureIgnoreCase))
        {
            await _next(context);
        }
        else
        {
            if (!context.Request.Headers.TryGetValue(ApiKeyHeader, out var extractedApiKey))
            {
                throw new UnauthorizedAccessException("Api key is missing");
            }

            var appSettings = context.RequestServices.GetRequiredService<IConfiguration>();

            var apiKey = appSettings.GetValue<string>(ApiKeyConfig);

            if (apiKey == null || !apiKey.Equals(extractedApiKey, StringComparison.OrdinalIgnoreCase))
            {
                throw new UnauthorizedAccessException("Api key is not correct");
            }

            await _next(context);
        }
    }
}
