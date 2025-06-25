using Microsoft.EntityFrameworkCore;
using Routine_.Core.Entities;

namespace Routine_.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Tarefa> Tarefas { get; set; }
    public DbSet<TarefaFragmento> TarefaFragmento { get; set; }
    public DbSet<ContatoEmergencia> ContatosEmergencia { get; set; }
}
