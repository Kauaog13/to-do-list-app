import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/todo';
import { ListTodo } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onEdit,
  onDelete
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <ListTodo className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Nenhuma tarefa encontrada</p>
        <p className="text-gray-400 text-sm mt-1">Comece adicionando uma nova tarefa!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};