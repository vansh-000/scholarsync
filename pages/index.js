import ResumeUploader from '../components/ResumeUploader';
import ScholarProfileInput from '../components/ScholarProfileInput';
import ParsedResumeView from '../components/ParsedResumeView';
import ScholarProfileView from '../components/ScholarProfileView';
import ProjectSuggestions from '../components/ProjectSuggestions';
import { useDispatch } from 'react-redux';
import { generateSuggestions } from '../redux/slices/suggestionsSlice';

export default function HomePage() {
  const dispatch = useDispatch();

  const handleGenerate = () => {
    dispatch(generateSuggestions());
  };

  return (
    <div className="p-6 space-y-6">
      <ResumeUploader />
      <ParsedResumeView />
      <ScholarProfileInput />
      <ScholarProfileView />
      <button onClick={handleGenerate} className="btn btn-accent">
        Generate Project Suggestions
      </button>
      <ProjectSuggestions />
    </div>
  );
}
