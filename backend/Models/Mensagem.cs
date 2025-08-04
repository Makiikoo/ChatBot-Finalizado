using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ChatBotAPI.Models
{
  public class Mensagem
  {
    public int Id { get; set; }

    [Required]
    public string Pergunta { get; set; }

    [Required]
    public string Resposta { get; set; }

    public int BotId { get; set; }

    [JsonIgnore]
    public Bot Bot { get; set; }

    public DateTime Data { get; set; } = DateTime.Now;
    
    }
}