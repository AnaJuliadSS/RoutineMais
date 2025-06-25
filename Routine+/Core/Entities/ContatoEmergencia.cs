using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Routine_.Core.Enums;

namespace Routine_.Core.Entities;

public class ContatoEmergencia
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Nome { get; set; }

    [EmailAddress]
    public string Email { get; set; }

    public string Telefone { get; set; }

    [Required]
    public MetodoContato MetodoParaContato { get; set; }

    [ForeignKey("Usuario")]
    public int UsuarioId { get; set; }

    public Usuario Usuario { get; set; }
}
