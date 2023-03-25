using Application.Abstractions.Messaging;
using Application.Abstractions.Tenant;
using Domain.Products;
using Domain.Shared;
using Marten;
using Marten.Storage;

namespace Application.Products.DeleteProduct;

internal sealed class DeleteProductCommandHandler
    : ICommandHandler<DeleteProductCommand>
{
    private readonly IDocumentSession _session;
    private readonly ITenantProvider _tenant;

    public DeleteProductCommandHandler(IDocumentSession session, ITenantProvider tenant)
    {
        _session = session;
        _tenant = tenant;
    }

    public async Task<Result> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        _session
            .ForTenant(_tenant.Tenant)
            .Delete<Product>(request.Id);

        await _session.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
