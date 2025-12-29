import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Target, Zap, Users } from 'lucide-react';
import { MadeWithApplaa } from '@/components/made-with-applaa';

const About = () => {
  const features = [
    {
      icon: <CheckSquare className="w-8 h-8 text-blue-500" />,
      title: "Complete Task Management",
      description: "Add, edit, delete, and mark tasks as complete with an intuitive interface."
    },
    {
      icon: <Target className="w-8 h-8 text-green-500" />,
      title: "Priority Levels",
      description: "Organize your tasks by priority (Low, Medium, High) to focus on what matters most."
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-500" />,
      title: "Due Date Tracking",
      description: "Set due dates for your tasks and never miss an important deadline."
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Persistent Storage",
      description: "Your tasks are safely stored in the database and accessible across sessions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About TodoMaster</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your intelligent task management solution designed to help you stay organized, 
            focused, and productive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  {feature.icon}
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Built with Modern Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-100">
              TodoMaster is built using React, TypeScript, and modern web technologies 
              to provide a fast, responsive, and reliable experience. The app uses 
              PostgreSQL for data persistence and features a clean, intuitive interface 
              powered by Tailwind CSS and shadcn/ui components.
            </p>
          </CardContent>
        </Card>
      </div>
      <MadeWithApplaa />
    </div>
  );
};

export default About;