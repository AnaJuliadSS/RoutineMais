namespace Routine_.Infra.Exceptions;

public class UsuarioOuSenhaInvalidosException : Exception
{
    public UsuarioOuSenhaInvalidosException()
            : base("Usuário ou senha inválidos.") { }
}
