using Microsoft.AspNetCore.Mvc;
using Routine_.Auth;
using Routine_.Core.DTO;

namespace Routine_.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUsuarioDTO loginUsuarioDTO)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var usuario = await _authService.LoginAsync(loginUsuarioDTO.Email, loginUsuarioDTO.Senha);

        var token = _authService.GerarToken(usuario);

        return Ok(new
        {
            usuario.Id,
            usuario.Nome,
            usuario.Email,
            usuario.Pontos,
            Token = token
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] CadastroUsuarioDTO cadastroUsuarioDTO)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var usuario = await _authService.RegisterAsync(cadastroUsuarioDTO);

        if (usuario == null)
            return Conflict(new { message = "Email já cadastrado" });

        return CreatedAtAction(nameof(Register), new { id = usuario.Id }, new
        {
            usuario.Id,
            usuario.Nome,
            usuario.Email,
            usuario.Pontos
        });
    }
}
