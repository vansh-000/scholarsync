import React from 'react';
import { useSelector } from 'react-redux';
import { ExternalLink, Award, BookOpen, Users, Calendar, Quote } from 'lucide-react';

const ScholarProfileView = () => {
  const { profileData, loading } = useSelector((state) => state.scholar);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            <p className="text-lg text-gray-600">Fetching Scholar profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) return null;

  const { profile, metrics, publications, coAuthors, lastUpdated } = profileData.data;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">{profile.name}</h2>
              <p className="text-emerald-100 text-lg">{profile.affiliation}</p>
              {profile.email && (
                <p className="text-emerald-200 text-sm">{profile.email}</p>
              )}
            </div>
            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Profile
            </a>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Quote className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{metrics.totalCitations}</p>
              <p className="text-gray-600 font-medium">Total Citations</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 rounded-full">
              <Award className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{metrics.hIndex}</p>
              <p className="text-gray-600 font-medium">h-Index</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{metrics.i10Index}</p>
              <p className="text-gray-600 font-medium">i10-Index</p>
            </div>
          </div>
        </div>
      </div>

      {/* Publications */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-3">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span>Top Publications</span>
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-6 max-h-96 overflow-auto">
            {publications.map((pub, idx) => (
              <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                <h4 className="font-semibold text-gray-900 text-lg leading-tight mb-2">
                  {pub.title}
                </h4>
                <p className="text-gray-600 mb-1">{pub.authors}</p>
                <p className="text-gray-500 italic text-sm mb-2">{pub.venue}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    <Quote className="h-3 w-3 mr-1" />
                    {pub.citations} citations
                  </span>
                  <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                    <Calendar className="h-3 w-3 mr-1" />
                    {pub.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Co-Authors */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-3">
            <Users className="h-6 w-6 text-emerald-600" />
            <span>Co-authors</span>
          </h3>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {coAuthors.map((author, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <Users className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{author.name}</p>
                  <p className="text-sm text-gray-600">{author.affiliation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ScholarProfileView;