using Routine_.Core.Entities;

namespace Routine_.Repositories.Interfaces;

public interface IUsuarioRepository
{
    Task<Usuario> GetByEmailAsync(string email);
    Task<Usuario> CreateAsync(Usuario usuario);
}
