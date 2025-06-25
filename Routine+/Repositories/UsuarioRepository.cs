using Microsoft.EntityFrameworkCore;
using Routine_.Core.Entities;
using Routine_.Data;
using Routine_.Repositories.Interfaces;

namespace Routine_.Repositories;

public class UsuarioRepository(AppDbContext context) : IUsuarioRepository
{
    private readonly AppDbContext _context = context;

    public async Task<Usuario> GetByEmailAsync(string email)
    {
        return await _context.Usuarios
        .FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
    }

    public async Task<Usuario> CreateAsync(Usuario usuario)
    {
        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();
        return usuario;
    }
}
