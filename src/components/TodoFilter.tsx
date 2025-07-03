import React from 'react';
import { FilterType, TodoStats } from '../types/todo';

interface TodoFilterProps {
  filter: FilterType;
  stats: TodoStats;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filter,
  stats,
  onFilterChange,
  onClearCompleted
}) => {
  const filters: { key: FilterType; label: string; count?: number }[] = [
    { key: 'all', label: 'Todas', count: stats.total },
    { key: 'active', label: 'Ativas', count: stats.active },
    { key: 'completed', label: 'Concluídas', count: stats.completed }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 p-4 bg-white rounded-xl shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Filtrar por:</span>
        <div className="flex gap-1">
          {filters.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === key
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
              {count !== undefined && (
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                  filter === key ? 'bg-blue-400' : 'bg-gray-300'
                }`}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {stats.completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          Limpar Concluídas
        </button>
      )}
    </div>
  );
};