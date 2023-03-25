using Application.Abstractions.Messaging;
using Application.Abstractions.Tenant;
using Application.Products.Shared;
using Domain.Products;
using Domain.Shared;
using Marten;
using Marten.Pagination;
using Marten.Storage;
using Component = Application.Products.Shared.Component;

namespace Application.Products.GetProducts;

internal sealed class GetProductsQueryHandler
    : IQueryHandler<GetProductsQuery, List<ProductResponse>>
{
    private readonly IQuerySession _session;
    private readonly ITenantProvider _tenant;

    public GetProductsQueryHandler(IQuerySession session, ITenantProvider tenant)
    {
        _session = session;
        _tenant = tenant;
    }

    public async Task<Result<List<ProductResponse>>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
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
            .OrderBy(p => p.Id)
            .ToPagedListAsync(request.Page, request.PageSize, cancellationToken);

        return products.ToList();
    }
}
