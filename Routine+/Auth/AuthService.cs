using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.IdentityModel.Tokens;
using Routine_.Core.DTO;
using Routine_.Core.Entities;
using Routine_.Infra.Exceptions;
using Routine_.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Routine_.Auth;

public class AuthService(IUsuarioRepository usuarioRepository) : IAuthService
{
    private readonly IUsuarioRepository _usuarioRepository = usuarioRepository;
    private readonly PasswordHasher<Usuario> _passwordHasher = new PasswordHasher<Usuario>();

    public async Task<Usuario> LoginAsync(string email, string senha)
    {
        var usuario = await _usuarioRepository.GetByEmailAsync(email) ?? throw new UsuarioOuSenhaInvalidosException();
        var verificaSenha = _passwordHasher.VerifyHashedPassword(usuario, usuario.SenhaHash, senha);

        if (verificaSenha == PasswordVerificationResult.Failed)
            throw new UsuarioOuSenhaInvalidosException();

        return usuario;
    }

    public async Task<Usuario> RegisterAsync(CadastroUsuarioDTO cadastroUsuarioDTO)
    {
        var existente = await _usuarioRepository.GetByEmailAsync(cadastroUsuarioDTO.Email);

        if (existente != null)
            throw new EmailJaCadastradoException();

        var novoUsuario = new Usuario
        {
            Nome = cadastroUsuarioDTO.Nome,
            Email = cadastroUsuarioDTO.Email,
            Pontos = 0,
            Tarefas = [],
            ContatosEmergencia = []
        };

        novoUsuario.SenhaHash = _passwordHasher.HashPassword(novoUsuario, cadastroUsuarioDTO.Senha);

        return await _usuarioRepository.CreateAsync(novoUsuario);
    }

    public string GerarToken(Usuario usuario)
    {
        var chave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET") ?? "MinhaChaveSuperSecreta123!"));

        var creds = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
            new Claim("nome", usuario.Nome),
        };

        var token = new JwtSecurityToken(
            issuer: null,
            audience: null,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
