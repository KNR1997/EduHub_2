using AutoMapper;
using TMA.Dtos;
using TMA.Dtos.PageDtos;
using TMA.Models;

namespace TMA.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        {
            CreateMap<Student, StudentDto>();
            CreateMap<Student, StudentPageDto>();
        }
    }
}
