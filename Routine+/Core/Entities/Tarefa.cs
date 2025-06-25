using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Routine_.Core.Entities;

public class Tarefa
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Titulo { get; set; }

    public string Descricao { get; set; }

    public string CorHex { get; set; }  
    public string NomeIcone { get; set; }

    public DateTime? DataLimite { get; set; }

    public bool Concluida { get; set; } = false;

    public int PontosRecompensa { get; set; } = 0;

    [ForeignKey("Usuario")]
    public int UsuarioId { get; set; }

    public Usuario Usuario { get; set; }

    public List<TarefaFragmento> Fragmentos { get; set; }
}
