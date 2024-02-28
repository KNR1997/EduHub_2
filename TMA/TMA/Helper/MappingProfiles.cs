using AutoMapper;
using TMA.Dtos;
using TMA.Models;

namespace TMA.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        {
            CreateMap<Workspace, WorkspaceDto>();
        }
    }
}
