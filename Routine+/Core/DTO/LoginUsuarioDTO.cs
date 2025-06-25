using System.ComponentModel.DataAnnotations;

namespace Routine_.Core.DTO;

public class LoginUsuarioDTO
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Senha { get; set; }
}
