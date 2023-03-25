using Application.Abstractions.Messaging;
using Application.Abstractions.Tenant;
using Domain.Products;
using Domain.Shared;
using Marten;
using Marten.Storage;

namespace Application.Products.UpdateProduct;

internal class UpdateProductCommandHandler
    : ICommandHandler<UpdateProductCommand>
{
    private readonly IDocumentSession _session;
    private readonly ITenantProvider _tenant;

    public UpdateProductCommandHandler(IDocumentSession session, ITenantProvider tenant)
    {
        _session = session;
        _tenant = tenant;
    }

    public async Task<Result> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        Product? product = await _session.LoadAsync<Product>(request.Id, cancellationToken);

        if (product is null)
        {
            return Result.Failure(new Error(
                "Product.NotFound",
                $"The product with the Id = '{request.Id}' was not found."));
        }

        product.Name = request.Name;
        product.Owner = request.Owner;
        product.Description = request.Description;
        product.Components = new();

        foreach (var component in request.Components)
        {
            var newComponent = new Domain.Products.Component
            {
                Id = component.Id,
                TypeName = component.TypeName,
                PublicProps = new()
            };

            foreach (var prop in component.PublicProps)
            {
                var newProp = new Domain.Products.PublicProp
                {
                    Name = prop.Name,
                    Type = prop.Type,
                    Value = prop.Value
                };

                newComponent.PublicProps.Add(newProp);
            }

            product.Components.Add(newComponent);
        }

        _session
            .ForTenant(_tenant.Tenant)
            .Update(product);

        await _session.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
