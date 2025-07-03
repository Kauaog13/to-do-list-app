import React from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoStats } from './components/TodoStats';
import { Notification } from './components/Notification';
import { CheckSquare } from 'lucide-react';

function App() {
  const {
    todos,
    filter,
    stats,
    notification,
    setFilter,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Progresso
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Organize suas tarefas de forma simples e eficiente
          </p>
        </div>

        {/* Stats */}
        <TodoStats stats={stats} />

        {/* Add Todo Form */}
        <TodoForm onAddTodo={addTodo} />

        {/* Filter */}
        <TodoFilter
          filter={filter}
          stats={stats}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
        />

        {/* Todo List */}
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={deleteTodo}
        />

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2025 Progresso - Sistema de gerenciamento de tarefas moderno</p>
        </footer>
      </div>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
        />
      )}
    </div>
  );
}

export default App;