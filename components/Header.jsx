import { GraduationCap, Search, Bell, User, Menu } from 'lucide-react';
import React, {useState} from 'react'

export default function Header({setCurrentSection,currentSection}) {
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Scholar Sync
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Academic Project Platform</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setCurrentSection('upload')}
                className={`text-sm font-medium transition-colors ${currentSection === 'upload'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Upload
              </button>
              <button
                onClick={() => setCurrentSection('view')}
                className={`text-sm font-medium transition-colors ${currentSection === 'view' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Profile
              </button>
              <button
                onClick={() => setCurrentSection('suggestions')}
                className={`text-sm font-medium transition-colors ${currentSection === 'suggestions'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Suggestions
              </button>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors">
                <User className="h-4 w-4" />
                <span className="text-sm">Profile</span>
              </button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  setCurrentSection('upload');
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md w-full text-left"
              >
                Upload
              </button>
              <button
                onClick={() => {
                  setCurrentSection('view');
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md w-full text-left"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  setCurrentSection('suggestions');
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md w-full text-left"
              >
                Suggestions
              </button>
            </div>
          </div>
        )}
      </header>
  )
}
