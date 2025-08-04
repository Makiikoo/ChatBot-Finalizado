using Microsoft.AspNetCore.Mvc;
using ChatBotAPI.Data;
using ChatBotAPI.Dtos;
using ChatBotAPI.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ChatBotAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BotsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public BotsController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetBots()
        {
            var bots = _context.Bots.Include(b => b.Mensagens).ToList();
            var botsDto = _mapper.Map<List<BotDto>>(bots);
            return Ok(botsDto);
        }

        [HttpGet("{id}")]
        public IActionResult GetBotById(int id)
        {
            var bot = _context.Bots
                .Include(b => b.Mensagens)
                .FirstOrDefault(b => b.Id == id);

            if (bot == null)
                return NotFound("Bot não encontrado");

            var botDto = _mapper.Map<BotDto>(bot);
            return Ok(botDto);
        }

        [HttpPost]
        public IActionResult CreateBot([FromBody] BotDto botDto)
        {
            var bot = _mapper.Map<Bot>(botDto);
            _context.Bots.Add(bot);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetBots), new { id = bot.Id }, botDto);
        }

        // Método de exclusão de bot
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBot(int id)
        {
            var bot = await _context.Bots.Include(b => b.Mensagens).FirstOrDefaultAsync(b => b.Id == id);
            if (bot == null)
                return NotFound("Bot não encontrado.");

            // Remove primeiro todas as mensagens relacionadas
            _context.Mensagens.RemoveRange(bot.Mensagens);

            // Depois remove o bot
            _context.Bots.Remove(bot);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
