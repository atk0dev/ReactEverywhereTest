using Application.Abstractions.Messaging;

namespace Application.Products.CreateProduct;

public sealed record CreateProductCommand(
    string Owner,
    string Name,
    string Description,
    List<Component> Components) : ICommand;

public sealed record Component(string Id, string TypeName, List<PublicProps> PublicProps);
public sealed record PublicProps(string Name, string Type, string Value);
