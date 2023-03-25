using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products.Shared;

public static class ProductHelper
{
    public static List<Component> GetComponents(List<Domain.Products.Component> components)
    {
        var result = new List<Component>();

        foreach (var component in components)
        {
            var newComponent = new Component
            {
                Id = component.Id,
                TypeName = component.TypeName,
                PublicProps = new()
            };

            foreach (var publicProp in component.PublicProps)
            {
                var newProp = new PublicProps
                {
                    Type = publicProp.Type,
                    Name = publicProp.Name,
                    Value = publicProp.Value,
                };

                newComponent.PublicProps.Add(newProp);
            }

            result.Add(newComponent);
        }

        return result;
    }
}
