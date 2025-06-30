import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchScholarProfile } from '../redux/slices/scholarSlice';

const ScholarProfileInput = () => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleFetch = () => {
    if (url) dispatch(fetchScholarProfile(url));
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter Google Scholar Profile URL"
        className="input"
      />
      <button onClick={handleFetch} className="btn btn-primary ml-2">
        Fetch
      </button>
    </div>
  );
};

export default ScholarProfileInput;
