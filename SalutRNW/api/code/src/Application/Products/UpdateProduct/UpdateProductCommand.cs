using Application.Abstractions.Messaging;

namespace Application.Products.UpdateProduct;

public sealed record UpdateProductCommand(
    long Id,
    string Name,
    string Owner,
    string Description,
    List<Component> Components) : ICommand;

public sealed record Component(string Id, string TypeName, List<PublicProps> PublicProps);
public sealed record PublicProps(string Name, string Type, string Value);
