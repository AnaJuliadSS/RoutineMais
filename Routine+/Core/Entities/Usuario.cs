using System.ComponentModel.DataAnnotations;

namespace Routine_.Core.Entities;

public class Usuario
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Nome { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string SenhaHash { get; set; }

    public int Pontos { get; set; } = 0;

    public List<Tarefa> Tarefas { get; set; }

    public List<ContatoEmergencia> ContatosEmergencia { get; set; }
}
