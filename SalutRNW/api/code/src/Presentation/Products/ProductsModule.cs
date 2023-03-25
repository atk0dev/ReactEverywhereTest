using Application.Products.CreateProduct;
using Application.Products.DeleteProduct;
using Application.Products.GetLatestProduct;
using Application.Products.GetProduct;
using Application.Products.GetProducts;
using Application.Products.UpdateProduct;
using Carter;
using Domain.Shared;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using Presentation.Products.Requests;

namespace Presentation.Products;

public class ProductsModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/products", async (string owner, int? page, int? pageSize, ISender sender, ILogger<ProductsModule> logger) =>
        {
            logger.LogInformation("Get products for page {Page} size {Size}", page, pageSize);
            int normalPage = 1;
            if (page != null)
            {
                normalPage = page.Value;
            }

            int normalPageSize = 10;
            if (pageSize != null)
            {
                normalPageSize = pageSize.Value < 0 || pageSize.Value > 100 ? 10 : pageSize.Value;
            }

            var result = await sender
                .Send(new GetProductsQuery(owner, normalPage, normalPageSize));

            return Results.Ok(result.Value);
        });

        app.MapGet("/products/{productId}", async (string owner, long productId, ISender sender) =>
        {
            var result = await sender
                .Send(new GetProductQuery(owner, productId));

            if (!result.IsSuccess)
            {
                return Results.NotFound(result.Error);
            }

            return Results.Ok(result.Value);
        });

        app.MapGet("/products/latest", async (string owner, ISender sender) =>
        {
            var result = await sender
                .Send(new GetLatestProductQuery(owner));

            if (!result.IsSuccess)
            {
                return Results.NotFound(result.Error);
            }

            return Results.Ok(result.Value);
        });

        app.MapPost("/products", async (CreateProductRequest request, ISender sender) =>
        {
            CreateProductCommand command = request.Adapt<CreateProductCommand>();

            var result = await sender.Send(command);

            return Results.Ok(result);
        });

        app.MapPut(
            "/products/{productId}",
            async (
                long productId,
                [FromBody] UpdateProductRequest request,
                ISender sender) =>
            {
                UpdateProductCommand command = request.Adapt<UpdateProductCommand>() with
                {
                    Id = productId
                };

                Result result = await sender.Send(command);

                if (result.IsFailure)
                {
                    return Results.NotFound(result.Error);
                }

                return Results.NoContent();
            });

        app.MapDelete("/products/{productId}", async (string owner, long productId, ISender sender) =>
        {
            await sender.Send(new DeleteProductCommand(owner, productId));

            return Results.NoContent();
        });
    }
}
