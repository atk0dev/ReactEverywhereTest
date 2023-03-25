namespace Domain.Products;

public class Product
{
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Owner { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public List<Component> Components { get; set; } = new();
}
