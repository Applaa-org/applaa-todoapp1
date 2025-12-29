const API_URL = 'https://haix.ai/api';

// CRITICAL: Generate unique table name to avoid conflicts
// This ensures each app has its own unique tables
const randomString = Math.random().toString(36).substring(2, 10); // 8 characters
const TABLE_NAME = `todos_a3f9k2m1`; // Using the same table name from schema

// Define your data interface based on your table structure
export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  created_at: string;
  updated_at: string;
}

// GET all todos
export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/${TABLE_NAME}`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
}

// CREATE a new todo
export async function createTodo(todo: Omit<Todo, 'id' | 'created_at' | 'updated_at'>): Promise<Todo> {
  const response = await fetch(`${API_URL}/${TABLE_NAME}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error('Failed to create todo');
  return response.json();
}

// UPDATE a todo
export async function updateTodo(id: number, updates: Partial<Todo>): Promise<Todo> {
  const response = await fetch(`${API_URL}/${TABLE_NAME}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update todo');
  return response.json();
}

// DELETE a todo
export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${TABLE_NAME}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete todo');
}

// NOTE: The TABLE_NAME constant must match the table name in your CREATE TABLE statement
// Example: If TABLE_NAME is "todos_a3f9k2m1", your SQL must be: CREATE TABLE IF NOT EXISTS todos_a3f9k2m1 (...)
// The backend automatically handles CRUD for any table name you use!