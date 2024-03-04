using Microsoft.EntityFrameworkCore;
using TMA.Data;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Repository
{
    public class ColumnRepository : IColumnRepository
    {
        private readonly DataContext _context;

        public ColumnRepository(DataContext context)
        {
            _context = context;
        }

        public Column GetColumn(int id)
        {
            return _context.Columns.Where(w => w.Id == id).FirstOrDefault();
        }

        public bool SaveOrUpdateColumn(Column column)
        {
            if (column.Id == 0)
            {
                _context.Add(column);
            }
            else
            {
                _context.Update(column);
            }

            return Save();
        }

        public bool ColumnExists(int workspaceColumnId)
        {
            return _context.Columns.Any(w => w.Id == workspaceColumnId);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool DeleteColumn(Column column)
        {
            _context.Remove(column);
            return Save();
        }
    }
}
