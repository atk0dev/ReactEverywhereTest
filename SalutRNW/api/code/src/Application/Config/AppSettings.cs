using System.ComponentModel.DataAnnotations;

namespace Application.Config;

public sealed class AppSettings
{
    [Required]
    public bool PublishProductEvents { get; set; }

    public bool ShowExceptionStack { get; set; }
}
