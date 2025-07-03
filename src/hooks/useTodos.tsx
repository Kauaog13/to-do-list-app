import { useState, useEffect, useCallback } from 'react';
import { Todo, FilterType, TodoStats } from '../types/todo';
import { loadTodos, saveTodos, generateId } from '../utils/localStorage';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Load todos on mount
  useEffect(() => {
    const loadedTodos = loadTodos();
    setTodos(loadedTodos);
  }, []);

  // Save todos whenever they change
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // Show notification
  const showNotification = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Add todo
  const addTodo = useCallback((text: string) => {
    if (!text.trim()) return;
    
    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setTodos(prev => [newTodo, ...prev]);
    showNotification('Tarefa adicionada com sucesso!');
  }, [showNotification]);

  // Toggle todo completion
  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
        : todo
    ));
  }, []);

  // Edit todo
  const editTodo = useCallback((id: string, newText: string) => {
    if (!newText.trim()) return;
    
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? { ...todo, text: newText.trim(), updatedAt: new Date() }
        : todo
    ));
    showNotification('Tarefa atualizada com sucesso!');
  }, [showNotification]);

  // Delete todo
  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    showNotification('Tarefa excluída com sucesso!');
  }, [showNotification]);

  // Clear completed todos
  const clearCompleted = useCallback(() => {
    const completedCount = todos.filter(todo => todo.completed).length;
    setTodos(prev => prev.filter(todo => !todo.completed));
    showNotification(`${completedCount} tarefa(s) concluída(s) removida(s)!`);
  }, [todos, showNotification]);

  // Get filtered todos
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  // Get stats
  const stats: TodoStats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  };

  return {
    todos: filteredTodos,
    filter,
    stats,
    notification,
    setFilter,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted
  };
};