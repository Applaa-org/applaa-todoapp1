import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { CheckSquare } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              TodoMaster
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              activeProps={{ className: 'text-blue-600' }}
            >
              Dashboard
            </Link>
            <Link 
              to="/todos" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              activeProps={{ className: 'text-blue-600' }}
            >
              All Todos
            </Link>
            <Link 
              to="/completed" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              activeProps={{ className: 'text-blue-600' }}
            >
              Completed
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              activeProps={{ className: 'text-blue-600' }}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}