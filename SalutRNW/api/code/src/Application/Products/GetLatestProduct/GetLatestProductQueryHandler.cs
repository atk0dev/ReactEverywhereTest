using Application.Abstractions.Messaging;
using Application.Abstractions.Tenant;
using Application.Products.Shared;
using Domain.Products;
using Domain.Shared;
using Marten;
using Marten.Pagination;
using MassTransit.Initializers;
using Component = Domain.Products.Component;

namespace Application.Products.GetLatestProduct;

internal sealed class GetLatestProductQueryHandler
    : IQueryHandler<GetLatestProductQuery, ProductResponse>
{
    private readonly IQuerySession _session;
    private readonly ITenantProvider _tenant;

    public GetLatestProductQueryHandler(IQuerySession session, ITenantProvider tenant)
    {
        _session = session;
        _tenant = tenant;
    }

    public async Task<Result<ProductResponse>> Handle(GetLatestProductQuery request, CancellationToken cancellationToken)
    {
        var products = await _session
            .ForTenant(_tenant.Tenant)
            .Query<Product>().Where(p => p.Owner == request.Owner)
            .Select(p => new ProductResponse
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Owner = p.Owner,
                Components = ProductHelper.GetComponents(p.Components)
            })
            .OrderByDescending(p => p.Id)
            .Take(1)
            .ToListAsync(cancellationToken);

        if (products.Any())
        {
            return products[0];
        }

        return Result.Failure<ProductResponse>(new Error(
            "Product.NotFound",
            $"The latest product with was not found."));
    }
}
