using Application.Abstractions.Messaging;
using Application.Products.Shared;

namespace Application.Products.GetProducts;

public sealed record GetProductsQuery(string Owner, int Page, int PageSize) : IQuery<List<ProductResponse>>;
