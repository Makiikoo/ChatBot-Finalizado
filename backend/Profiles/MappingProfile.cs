using AutoMapper;
using ChatBotAPI.Models;
using ChatBotAPI.Dtos;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Bot, BotDto>().ReverseMap();
        CreateMap<Mensagem, MensagemDto>().ReverseMap();
    }
}
