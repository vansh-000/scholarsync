import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { uploadResume } from '../redux/slices/resumeSlice';

const ResumeUploader = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('resume', file);
      dispatch(uploadResume(formData));
    }
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="file-input"
      />
    </div>
  );
};

export default ResumeUploader;