import React, { useState } from 'react';
import { Check, Edit2, Trash2, X, Save } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onEdit,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(todo.id);
    setShowDeleteConfirm(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={`group bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all duration-200 hover:shadow-md ${
      todo.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {todo.completed && <Check className="w-3 h-3" />}
        </button>

        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
                autoFocus
              />
              <button
                onClick={handleEdit}
                className="p-1 text-green-600 hover:text-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-1 text-gray-600 hover:text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <p className={`text-gray-800 ${todo.completed ? 'line-through' : ''}`}>
                {todo.text}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Criado em {formatDate(todo.createdAt)}
                {todo.updatedAt.getTime() !== todo.createdAt.getTime() && (
                  <span> • Atualizado em {formatDate(todo.updatedAt)}</span>
                )}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          
          {showDeleteConfirm ? (
            <div className="flex items-center gap-1">
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};