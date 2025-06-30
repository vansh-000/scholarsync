import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchScholarProfile } from '../redux/slices/scholarSlice';
import { Search, ExternalLink, BookOpen, Info } from 'lucide-react';

const ScholarProfileInput = () => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleFetch = () => {
    if (url.trim()) dispatch(fetchScholarProfile(url.trim()));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetch();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">Google Scholar Integration</h2>
              <p className="text-emerald-100">Connect your academic profile for enhanced suggestions</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Google Scholar Profile URL
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="https://scholar.google.com/citations?user=..."
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                />
              </div>
              <button
                onClick={handleFetch}
                disabled={!url.trim()}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Search className="h-4 w-4 mr-2" />
                Fetch Profile
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-medium text-blue-900">How to get your Google Scholar URL:</h4>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Go to <span className="font-mono bg-blue-100 px-1 rounded">scholar.google.com</span></li>
                  <li>Search for your name and click on your profile</li>
                  <li>Copy the URL from your browser's address bar</li>
                  <li>Paste it above and click "Fetch Profile"</li>
                </ol>
                <p className="text-sm text-blue-600 mt-2">
                  <strong>Note:</strong> Your profile must be public to fetch data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarProfileInput;