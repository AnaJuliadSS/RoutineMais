namespace Routine_.Infra.Exceptions;

public class EmailJaCadastradoException : Exception
{
    public EmailJaCadastradoException()
            : base("Email já cadastrado.") { }
}
