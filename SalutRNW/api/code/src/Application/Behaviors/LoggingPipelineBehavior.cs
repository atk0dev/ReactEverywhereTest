﻿using System.Diagnostics;
using Domain.Shared;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Behaviors;

public class LoggingPipelineBehavior<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
    where TResponse : Result
{
    private readonly ILogger<LoggingPipelineBehavior<TRequest, TResponse>> _logger;

    public LoggingPipelineBehavior(
        ILogger<LoggingPipelineBehavior<TRequest, TResponse>> logger)
    {
        _logger = logger;
    }

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        var timer = new Stopwatch();
        timer.Start();

        _logger.LogInformation(
            "Starting request {@RequestName}, {@DateTimeUtc}",
            typeof(TRequest).Name,
            DateTime.UtcNow);

        var result = await next();

        if (result.IsFailure)
        {
            _logger.LogError(
                "Request failure {@RequestName}, {@Error}, {@DateTimeUtc}",
                typeof(TRequest).Name,
                result.Error,
                DateTime.UtcNow);
        }

        timer.Stop();
        _logger.LogInformation(
            "Completed request {@RequestName}, {@DateTimeUtc}, for {@Elapsed} ms",
            typeof(TRequest).Name,
            DateTime.UtcNow,
            timer.ElapsedMilliseconds);

        return result;
    }
}
