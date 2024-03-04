using AutoMapper;
using TMA.Dtos;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Services
{
    public class ColumnService
    {
        private readonly IWorkspaceRepository _workspaceRepository;
        private readonly IColumnRepository _columnRepository;
        private readonly IMapper _mapper;

        public ColumnService(IWorkspaceRepository workspaceRepository, IMapper mapper, IColumnRepository columnRepository)
        {
            _workspaceRepository = workspaceRepository;
            _columnRepository = columnRepository;
            _mapper = mapper;
        }

        public void SaveOrUpdateColumn(ColumnDto updateDTO)
        {
            Column column;
            bool isNew = (updateDTO.ColumnId == 0);
            Workspace workspace = _workspaceRepository.GetWorkspace(updateDTO.WorkspaceId);

            if (!isNew)
            {
                column = _columnRepository.GetColumn(updateDTO.ColumnId);
            }
            else
            {
                column = new Column();
            }

            column.name = updateDTO.ColumnName;
            column.Workspace = workspace;
            _columnRepository.SaveOrUpdateColumn(column);
        }

        public void DeleteColumn(int columnId)
        {
              Column column = _columnRepository.GetColumn(columnId);
            _columnRepository.DeleteColumn(column);
        }
    }
}
