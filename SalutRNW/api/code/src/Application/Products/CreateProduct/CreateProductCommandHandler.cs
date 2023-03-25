using Application.Abstractions.EventBus;
using Application.Abstractions.Messaging;
using Application.Abstractions.Tenant;
using Application.Config;
using Domain.Products;
using Domain.Shared;
using Marten;

namespace Application.Products.CreateProduct;

internal sealed class CreateProductCommandHandler
    : ICommandHandler<CreateProductCommand>
{
    private readonly IDocumentSession _session;
    private readonly IEventBus _eventBus;
    private readonly ITenantProvider _tenant;
    private readonly AppSettings _settings;

    public CreateProductCommandHandler(IDocumentSession session, IEventBus eventBus, ITenantProvider tenant, AppSettings settings)
    {
        _session = session;
        _eventBus = eventBus;
        _tenant = tenant;
        _settings = settings;
    }

    public async Task<Result> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var product = new Product
        {
            Name = request.Name,
            Owner = request.Owner,
            Description = request.Description,
            Components = new()
        };

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
            .Store(product);

        await _session.SaveChangesAsync(cancellationToken);

        if (_settings.PublishProductEvents)
        {
            await _eventBus.PublishAsync(
                new ProductCreatedEvent
                {
                    Id = product.Id,
                    Name = product.Name,
                    Owner = product.Owner,
                },
                cancellationToken);
        }

        return Result.Success(new { id = product.Id });
    }
}
