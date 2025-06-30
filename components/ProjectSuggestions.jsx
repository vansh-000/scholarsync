import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ProjectSuggestions = () => {
  const { suggestions, loading } = useSelector((state) => state.suggestions);

  if (loading) return <p>Generating Suggestions...</p>;
  if (!suggestions || suggestions.length === 0) return <p>No Suggestions Yet</p>;
  console.log('Project Suggestions:', suggestions);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Project Suggestions</h2>
      <ul className="list-disc ml-5">
        {suggestions.map((item, idx) => (
          <li key={idx} className="mb-2">
            <p className="font-bold">{item.title}</p>
            <p className="text-sm">{item.description}</p>
            <p className="text-xs text-gray-500">
              Difficulty: {item.difficulty} | Estimated Time: {item.estimatedTime}
            </p>
            {item.technologies && item.technologies.length > 0 && (
              <p className="text-xs">
                Technologies: {item.technologies.join(', ')}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectSuggestions;