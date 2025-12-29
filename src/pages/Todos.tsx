import { TodoList } from '@/components/TodoList';
import { MadeWithApplaa } from '@/components/made-with-applaa';

const Todos = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Todos</h1>
          <p className="text-gray-600">View and manage all your tasks in one place</p>
        </div>
        <TodoList />
      </div>
      <MadeWithApplaa />
    </div>
  );
};

export default Todos;