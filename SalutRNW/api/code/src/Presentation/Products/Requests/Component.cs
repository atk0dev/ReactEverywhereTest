namespace Presentation.Products.Requests;

public sealed record Component(string Id, string TypeName, List<PublicProps> PublicProps);
