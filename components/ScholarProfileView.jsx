import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ScholarProfileView = () => {
  const { profileData, loading } = useSelector((state) => state.scholar);

  if (loading) return <p>Loading Scholar Data...</p>;
  if (!profileData) return null;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Scholar Profile</h2>
      <pre>{JSON.stringify(profileData, null, 2)}</pre>
    </div>
  );
};

export default ScholarProfileView;