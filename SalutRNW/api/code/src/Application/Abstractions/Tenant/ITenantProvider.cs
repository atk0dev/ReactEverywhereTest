﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Abstractions.Tenant;

public interface ITenantProvider
{
    string Tenant { get; }
}
