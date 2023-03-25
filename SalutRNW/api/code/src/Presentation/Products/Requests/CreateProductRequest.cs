namespace Presentation.Products.Requests;

public sealed record CreateProductRequest(
    string Owner,
    string Name,
    string Description,
    List<Component> Components);
