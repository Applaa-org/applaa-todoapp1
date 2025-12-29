import { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo, type Todo } from '../lib/api';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      setLoading(true);
      setError(null);
      const data = await getTodos();
      setTodos(data);
    } catch (err: any) {
      console.error('Failed to load todos:', err);
      setError(err.message || 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  }

  async function addTodo(title: string, description?: string, priority: 'low' | 'medium' | 'high' = 'medium', dueDate?: string) {
    try {
      const newTodo = await createTodo({
        title,
        description,
        completed: false,
        priority,
        due_date: dueDate,
      });
      setTodos([newTodo, ...todos]);
      return newTodo;
    } catch (err: any) {
      console.error('Failed to create todo:', err);
      throw err;
    }
  }

  async function toggleTodo(id: number) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    try {
      const updated = await updateTodo(id, { completed: !todo.completed });
      setTodos(todos.map(t => t.id === id ? updated : t));
    } catch (err: any) {
      console.error('Failed to update todo:', err);
      throw err;
    }
  }

  async function editTodo(id: number, updates: Partial<Todo>) {
    try {
      const updated = await updateTodo(id, updates);
      setTodos(todos.map(t => t.id === id ? updated : t));
      return updated;
    } catch (err: any) {
      console.error('Failed to edit todo:', err);
      throw err;
    }
  }

  async function removeTodo(id: number) {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err: any) {
      console.error('Failed to delete todo:', err);
      throw err;
    }
  }

  return { 
    todos, 
    loading, 
    error, 
    addTodo, 
    toggleTodo, 
    editTodo,
    removeTodo, 
    refresh: loadTodos 
  };
}