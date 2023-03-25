namespace Application.Products.CreateProduct;

public record ProductCreatedEvent
{
    public long Id { get; init; }

    public string Name { get; init; } = string.Empty;

    public string Owner { get; init; } = string.Empty;
}
