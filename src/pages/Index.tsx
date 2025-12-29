import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Plus, Target, Calendar, TrendingUp } from 'lucide-react';
import { useTodos } from '@/hooks/useTodos';
import { MadeWithApplaa } from '@/components/made-with-applaa';

const Index = () => {
  const { todos } = useTodos();
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const highPriorityTodos = todos.filter(todo => todo.priority === 'high' && !todo.completed).length;

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTodos,
      icon: <Target className="w-8 h-8 text-blue-500" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Completed',
      value: completedTodos,
      icon: <CheckSquare className="w-8 h-8 text-green-500" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Pending',
      value: pendingTodos,
      icon: <Calendar className="w-8 h-8 text-orange-500" />,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'High Priority',
      value: highPriorityTodos,
      icon: <TrendingUp className="w-8 h-8 text-red-500" />,
      color: 'bg-red-100 text-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to TodoMaster
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Your intelligent task management solution. Stay organized, focused, and productive 
            with our powerful todo application.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/todos">
              <Button size="lg" className="text-lg">
                <Plus className="w-5 h-5 mr-2" />
                Get Started
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <CheckSquare className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <CardTitle className="text-xl">Complete Task Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Add, edit, delete, and mark tasks as complete with our intuitive interface.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Target className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-xl">Priority Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Organize tasks by priority levels to focus on what matters most.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calendar className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <CardTitle className="text-xl">Due Date Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Set due dates and never miss important deadlines again.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Recent Todos */}
        {todos.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Recent Tasks</CardTitle>
              <CardDescription>Your latest todo items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todos.slice(0, 5).map((todo) => (
                  <div key={todo.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        todo.priority === 'high' ? 'bg-red-500' :
                        todo.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                        {todo.title}
                      </span>
                    </div>
                    <Link to="/todos">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
              {todos.length > 5 && (
                <div className="text-center mt-4">
                  <Link to="/todos">
                    <Button variant="outline">View All Tasks</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      <MadeWithApplaa />
    </div>
  );
};

export default Index;