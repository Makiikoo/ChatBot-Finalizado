using System.ComponentModel.DataAnnotations;

namespace ChatBotAPI.Models
{
    public class Bot
    {
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public string Descricao { get; set; }

        public List<Mensagem> Mensagens { get; set; } = new();
    }
}