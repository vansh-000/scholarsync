import React from "react";
import { useSelector } from "react-redux";
import { FileText, User, Briefcase, Code, Star, Calendar } from "lucide-react";

const ParsedResumeView = () => {
  const { parsedData, loading } = useSelector((state) => state.resume);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-lg text-gray-600">Analyzing your resume...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!parsedData) return null;

  const { data, metadata } = parsedData;

  const formatFileSize = (size) => `${(size / 1024).toFixed(2)} KB`;

  return (
    <div className="mx-auto">

      {/* File Metadata */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span><strong>File:</strong> {metadata?.fileName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span><strong>Size:</strong> {formatFileSize(metadata?.fileSize)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span><strong>Uploaded:</strong> {new Date(metadata?.parsedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Personal Information */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <User className="h-5 w-5 text-green-600" />
            </div>
            <span>Personal Information</span>
          </h3>
          <div className="bg-green-50 rounded-xl p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-lg font-semibold text-gray-900">
                  {data?.personalInfo?.name || "Not provided"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-900">
                  {data?.personalInfo?.email || "Not provided"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-lg font-semibold text-gray-900">
                  {data?.personalInfo?.phone || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="h-5 w-5 text-purple-600" />
              </div>
              <span>Skills & Technologies</span>
            </h3>
            <div className="bg-purple-50 rounded-xl p-6">
              <div className="flex flex-wrap gap-3">
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-4 py-2 bg-white border border-purple-200 rounded-full text-sm font-medium text-purple-700 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Star className="h-3 w-3 mr-2 text-purple-500" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Work Experience */}
        {data.workExperience?.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Briefcase className="h-5 w-5 text-yellow-600" />
              </div>
              <span>Work Experience</span>
            </h3>
            <div className="bg-yellow-50 rounded-xl p-6">
              <div className="space-y-4">
                {data.workExperience.map((exp, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <p className="text-gray-700 leading-relaxed">{exp}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ParsedResumeView;