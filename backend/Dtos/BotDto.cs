namespace ChatBotAPI.Dtos
{
    public class BotDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public List<MensagemDto> Mensagens { get; set; } = new();
    }
}