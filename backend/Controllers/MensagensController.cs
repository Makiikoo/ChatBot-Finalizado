using Microsoft.AspNetCore.Mvc;
using ChatBotAPI.Data;
using ChatBotAPI.Models;
using ChatBotAPI.Services;
using ChatBotAPI.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ChatBotAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MensagensController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly OpenAIService _openAIService;

        public MensagensController(AppDbContext context, OpenAIService openAIService)
        {
            _context = context;
            _openAIService = openAIService;
        }

        // Envia pergunta para OpenAI e salva no banco de dados
        [HttpPost]
        public async Task<IActionResult> EnviarMensagem([FromBody] MensagemCriacaoDto dto)
        {
            var bot = await _context.Bots.FindAsync(dto.BotId);
            if (bot == null)
                return NotFound("Bot não encontrado.");

            try
            {
                var resposta = await _openAIService.ObterRespostaAsync(bot.Descricao, dto.Pergunta);

                var mensagem = new Mensagem
                {
                    Pergunta = dto.Pergunta,
                    Resposta = resposta,
                    BotId = bot.Id,
                    Data = DateTime.UtcNow
                };

                _context.Mensagens.Add(mensagem);
                await _context.SaveChangesAsync();

                return Ok(mensagem);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao consultar OpenAI: {ex.Message}");
            }
        }

        // Remove todas as mensagens de um bot específico
        [HttpDelete("{botId}")]
        public async Task<IActionResult> DeletarMensagensDoBot(int botId)
        {
            var mensagens = await _context.Mensagens
                .Where(m => m.BotId == botId)
                .ToListAsync();

            if (!mensagens.Any())
                return NotFound("Nenhuma mensagem encontrada para este bot.");

            _context.Mensagens.RemoveRange(mensagens);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
