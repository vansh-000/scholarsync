import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadResume } from "../redux/slices/resumeSlice";
import { UploadCloud, FileText, CheckCircle } from "lucide-react";

const ResumeUploader = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleFile = (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("resume", file);
      dispatch(uploadResume(formData));
      setUploadedFileName(file.name);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h2>
        <p className="text-gray-600">
          Get personalized project suggestions based on your skills and experience
        </p>
      </div>
      
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer group ${
          dragging 
            ? "border-blue-500 bg-blue-50 scale-[1.02]" 
            : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/50"
        } ${uploadedFileName ? "border-green-500 bg-green-50" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <div className="flex flex-col items-center space-y-4">
          {uploadedFileName ? (
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <FileText className="h-12 w-12 text-green-600" />
            </div>
          ) : (
            <UploadCloud className={`h-16 w-16 transition-colors ${
              dragging ? "text-blue-500" : "text-gray-400 group-hover:text-blue-500"
            }`} />
          )}
          
          <div className="space-y-2">
            {uploadedFileName ? (
              <>
                <p className="text-xl font-semibold text-green-700">
                  Resume Uploaded Successfully!
                </p>
                <p className="text-green-600 font-medium">{uploadedFileName}</p>
                <p className="text-sm text-gray-500">
                  Click to upload a different file
                </p>
              </>
            ) : (
              <>
                <p className="text-xl font-semibold text-gray-700">
                  {dragging ? "Drop your resume here" : "Drag & drop your resume"}
                </p>
                <p className="text-gray-500">
                  or <span className="text-blue-600 font-medium">click to browse</span>
                </p>
                <p className="text-sm text-gray-400">
                  Supports PDF, DOC, DOCX files
                </p>
              </>
            )}
          </div>
        </div>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ResumeUploader;