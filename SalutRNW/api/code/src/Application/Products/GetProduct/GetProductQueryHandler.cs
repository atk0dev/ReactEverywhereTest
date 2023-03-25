using Application.Abstractions.Messaging;
using Application.Abstractions.Tenant;
using Application.Products.Shared;
using Domain.Products;
using Domain.Shared;
using Marten;
using MassTransit.Initializers;
using Component = Domain.Products.Component;

namespace Application.Products.GetProduct;

internal sealed class GetProductQueryHandler
    : IQueryHandler<GetProductQuery, ProductResponse>
{
    private readonly IQuerySession _session;
    private readonly ITenantProvider _tenant;

    public GetProductQueryHandler(IQuerySession session, ITenantProvider tenant)
    {
        _session = session;
        _tenant = tenant;
    }

    public async Task<Result<ProductResponse>> Handle(GetProductQuery request, CancellationToken cancellationToken)
    {
        var product = await _session
            .ForTenant(_tenant.Tenant)
            .LoadAsync<Product>(request.Id, cancellationToken);

        if (product != null)
        {
            var result = new ProductResponse
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Owner = product.Owner,
                Components = ProductHelper.GetComponents(product.Components),
            };

            return result;
        }

        return Result.Failure<ProductResponse>(new Error(
            "Product.NotFound",
            $"The product with the Id = '{request.Id}' was not found."));
    }
}
