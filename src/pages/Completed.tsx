import { useTodos } from '@/hooks/useTodos';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { MadeWithApplaa } from '@/components/made-with-applaa';

const Completed = () => {
  const { todos } = useTodos();
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Completed Tasks</h1>
          <p className="text-gray-600">Celebrate your completed achievements</p>
        </div>

        {completedTodos.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No completed tasks yet. Keep going!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {completedTodos.map((todo) => (
              <Card key={todo.id} className="bg-green-50 border-green-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg line-through text-gray-600">
                      {todo.title}
                    </CardTitle>
                    <Badge className="bg-green-500 text-white"> // Changed from variant="success" to className
                      Completed
                    </Badge>
                  </div>
                </CardHeader>
                {todo.description && (
                  <CardContent>
                    <p className="text-gray-600 line-through">{todo.description}</p>
                  </CardContent>
                )}
                <CardContent className="pt-0">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <Badge variant="outline">{todo.priority} priority</Badge>
                    {todo.due_date && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Due: {format(new Date(todo.due_date), 'MMM d, yyyy')}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <MadeWithApplaa />
    </div>
  );
};

export default Completed;