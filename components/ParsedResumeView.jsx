import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ParsedResumeView = () => {
  const { parsedData, loading } = useSelector((state) => state.resume);

  if (loading) return <p>Loading Resume...</p>;
  if (!parsedData) return null;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Resume Details</h2>
      <pre>{JSON.stringify(parsedData, null, 2)}</pre>
    </div>
  );
};

export default ParsedResumeView;