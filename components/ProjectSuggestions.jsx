import React from 'react';
import { useSelector } from 'react-redux';
import { BookOpen, Clock, Zap, Code, Lightbulb, Target } from 'lucide-react';

const ProjectSuggestions = () => {
  const { suggestions, loading } = useSelector((state) => state.suggestions);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="text-lg text-gray-600">Generating personalized suggestions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <Lightbulb className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Suggestions Yet</h3>
          <p className="text-gray-500">
            Upload your resume and connect your Scholar profile to get personalized project suggestions.
          </p>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard':
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStartProject = (project) => {
    // Add your project start logic here
    console.log('Starting project:', project.title);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <Target className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Project Suggestions</h2>
            <p className="text-gray-600">Personalized recommendations based on your profile</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {suggestions.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-[1.02]"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-6 w-6 flex-shrink-0" />
                  <h3 className="text-xl font-bold leading-tight">{item.title}</h3>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <p className="text-gray-700 leading-relaxed">{item.description}</p>

              {/* Metadata */}
              <div className="flex flex-wrap gap-3">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(item.difficulty)}`}>
                  <Zap className="h-4 w-4 mr-1" />
                  {item.difficulty}
                </div>
                
                <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                  <Clock className="h-4 w-4 mr-1" />
                  {item.estimatedTime}
                </div>
              </div>

              {/* Technologies */}
              {item.technologies?.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Code className="h-5 w-5 text-gray-500" />
                    <h4 className="text-sm font-semibold text-gray-700">Technologies & Tools</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="bg-gray-50 px-6 py-4">
              <button 
                onClick={() => handleStartProject(item)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Start Project
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSuggestions;