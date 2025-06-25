using System.ComponentModel.DataAnnotations;

namespace Routine_.Core.DTO;

public class CadastroUsuarioDTO
{
    [Required]
    public string Nome { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Senha { get; set; }
}
