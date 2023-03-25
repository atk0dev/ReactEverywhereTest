using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Abstractions.Tenant;
using JasperFx.Core;
using Microsoft.AspNetCore.Http;

namespace Application;

public class TenantProvider : ITenantProvider
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public TenantProvider(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string Tenant => GetTenantFromHeader();

    private string GetTenantFromHeader()
    {
        var tenant = "default";

        var context = _httpContextAccessor.HttpContext;
        if (context != null)
        {
            context.Request.Headers.TryGetValue("x-tenant", out var header);
            var tenantValue = header.FirstOrDefault();
            if (tenantValue != null)
            {
                tenant = tenantValue;
            }
        }

        return tenant;
    }
}
