import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { Todo } from '../lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Trash2, Edit, Plus, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { showSuccess, showError } from '@/utils/toast';

export function TodoList() {
  const { todos, loading, error, addTodo, toggleTodo, editTodo, removeTodo } = useTodos();
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newDueDate, setNewDueDate] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  async function handleAddTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    
    try {
      await addTodo(newTitle, newDescription, newPriority, newDueDate);
      setNewTitle('');
      setNewDescription('');
      setNewPriority('medium');
      setNewDueDate('');
      setIsAddDialogOpen(false);
      showSuccess('Todo added successfully!');
    } catch (err) {
      showError('Failed to add todo');
    }
  }

  async function handleEditTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!editingTodo || !editingTodo.title.trim()) return;
    
    try {
      await editTodo(editingTodo.id, {
        title: editingTodo.title,
        description: editingTodo.description,
        priority: editingTodo.priority,
        due_date: editingTodo.due_date,
      });
      setEditingTodo(null);
      setIsEditDialogOpen(false);
      showSuccess('Todo updated successfully!');
    } catch (err) {
      showError('Failed to update todo');
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      await removeTodo(id);
      showSuccess('Todo deleted successfully!');
    } catch (err) {
      showError('Failed to delete todo');
    }
  }

  function getPriorityColor(priority: string) {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Loading todos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Todo List</h1>
        <p className="text-gray-600">Manage your tasks efficiently</p>
      </div>

      {/* Add Todo Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6">
            <Plus className="w-4 h-4 mr-2" />
            Add New Todo
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Todo</DialogTitle>
            <DialogDescription>
              Create a new task to track your progress
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddTodo}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter todo title"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Enter todo description (optional)"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={newPriority} onValueChange={(value) => setNewPriority(value as 'low' | 'medium' | 'high')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Todo</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Todo List */}
      <div className="space-y-4">
        {todos.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No todos yet. Create your first todo!</p>
            </CardContent>
          </Card>
        ) : (
          todos.map((todo) => (
            <Card key={todo.id} className={todo.completed ? 'opacity-75' : ''}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                    />
                    <CardTitle className={`text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                      {todo.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getPriorityColor(todo.priority) as any}>
                      {todo.priority}
                    </Badge>
                    {todo.due_date && (
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{format(new Date(todo.due_date), 'MMM d')}</span>
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingTodo(todo);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {todo.description && (
                <CardContent>
                  <CardDescription className={todo.completed ? 'line-through' : ''}>
                    {todo.description}
                  </CardDescription>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Edit Todo Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>
              Update your todo details
            </DialogDescription>
          </DialogHeader>
          {editingTodo && (
            <form onSubmit={handleEditTodo}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="editTitle">Title *</Label>
                  <Input
                    id="editTitle"
                    value={editingTodo.title}
                    onChange={(e) => setEditingTodo({...editingTodo, title: e.target.value})}
                    placeholder="Enter todo title"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editDescription">Description</Label>
                  <Textarea
                    id="editDescription"
                    value={editingTodo.description || ''}
                    onChange={(e) => setEditingTodo({...editingTodo, description: e.target.value})}
                    placeholder="Enter todo description (optional)"
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editPriority">Priority</Label>
                  <Select 
                    value={editingTodo.priority} 
                    onValueChange={(value) => setEditingTodo({...editingTodo, priority: value as 'low' | 'medium' | 'high'})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editDueDate">Due Date</Label>
                  <Input
                    id="editDueDate"
                    type="date"
                    value={editingTodo.due_date ? format(new Date(editingTodo.due_date), 'yyyy-MM-dd') : ''}
                    onChange={(e) => setEditingTodo({...editingTodo, due_date: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Todo</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}