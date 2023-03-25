namespace Presentation.Products.Requests;

public sealed record UpdateProductRequest(
    string Owner,
    string Name,
    string Description,
    List<Component> Components);
