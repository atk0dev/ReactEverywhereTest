using Application.Abstractions.Messaging;

namespace Application.Products.DeleteProduct;

public sealed record DeleteProductCommand(string Owner, long Id) : ICommand;
