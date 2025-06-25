using Routine_.Core.DTO;
using Routine_.Core.Entities;

namespace Routine_.Auth;

public interface IAuthService
{
    Task<Usuario> LoginAsync(string email, string senha);
    Task<Usuario> RegisterAsync(CadastroUsuarioDTO cadastroUsuarioDTO);
    string GerarToken(Usuario usuario);
}
