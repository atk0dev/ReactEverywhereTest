namespace Domain.Products;

public class Component
{
    public string Id { get; set; } = string.Empty;

    public int Order { get; set; }

    public string TypeName { get; set; } = string.Empty;

    public List<PublicProp> PublicProps { get; set; } = new();
}
