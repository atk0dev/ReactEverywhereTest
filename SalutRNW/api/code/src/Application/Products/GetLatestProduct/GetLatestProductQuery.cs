using Application.Abstractions.Messaging;
using Application.Products.Shared;

namespace Application.Products.GetLatestProduct;

public sealed record GetLatestProductQuery(string Owner) : IQuery<ProductResponse>;
