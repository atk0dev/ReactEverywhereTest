using Application.Products.GetProducts;

namespace Application.Products.Shared;

public class Component
{
    public string Id { get; set; } = string.Empty;

    public string TypeName { get; set; } = string.Empty;

    public List<PublicProps> PublicProps { get; set; } = new();
}
