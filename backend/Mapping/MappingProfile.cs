using AutoMapper;
using ChatBotAPI.Dtos;
using ChatBotAPI.Models;

namespace ChatBotAPI.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Bot, BotDto>().ReverseMap();
            CreateMap<Mensagem, MensagemDto>().ReverseMap();
        }
    }
}