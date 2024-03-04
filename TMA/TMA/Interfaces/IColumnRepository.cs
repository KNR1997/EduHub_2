using TMA.Models;

namespace TMA.Interfaces
{
    public interface IColumnRepository
    {
        Column GetColumn(int workspaceColumnId);

        bool SaveOrUpdateColumn(Column column);

        bool ColumnExists(int workspaceId);

        bool DeleteColumn(Column column);

    }
}
