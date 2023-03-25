using Application.Abstractions.Messaging;
using Application.Products.Shared;

namespace Application.Products.GetProduct;

public sealed record GetProductQuery(string Owner, long Id) : IQuery<ProductResponse>;
