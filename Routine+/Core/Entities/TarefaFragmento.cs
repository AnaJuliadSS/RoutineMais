using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Routine_.Core.Entities;

public class TarefaFragmento
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Descricao { get; set; }

    public bool Concluido { get; set; } = false;

    public int Ordem { get; set; }

    [ForeignKey("Tarefa")]
    public int TarefaId { get; set; }

    public Tarefa Tarefa { get; set; }
}
