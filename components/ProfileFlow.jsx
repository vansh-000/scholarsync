import React from 'react'

import ResumeUploader from '../components/ResumeUploader';
import ScholarProfileInput from '../components/ScholarProfileInput';
import ParsedResumeView from '../components/ParsedResumeView';
import ScholarProfileView from '../components/ScholarProfileView';
import ProjectSuggestions from '../components/ProjectSuggestions';
import { generateSuggestions } from '../redux/slices/suggestionsSlice';

import { useDispatch } from 'react-redux';
import { Sparkles, ArrowRight, FileCheck, BookOpen, Lightbulb } from 'lucide-react';

export default function ProfileFlow({ resumeData, scholarData, suggestions, suggestionsLoading, currentSection, setCurrentSection }) {

    const dispatch = useDispatch();
    const handleGenerateSuggestions = () => {
        dispatch(generateSuggestions());
        setCurrentSection('suggestions');
    };
    const canGenerateSuggestions = resumeData || scholarData;
    return (
        <div className="space-y-16">
            {currentSection === 'upload' && (
                <section className="space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-gray-900">Upload Your Academic Profile</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Start by uploading your resume or connecting your Google Scholar profile to begin
                            the matching process.
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8">
                        <ResumeUploader resumeData={resumeData} />
                        <ScholarProfileInput scholarData={scholarData} />
                    </div>
                    {(resumeData || scholarData) && (
                        <div className="text-center">
                            <button
                                onClick={() => setCurrentSection('view')}
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 text-lg shadow-lg"
                            >
                                Review Your Profile
                                <ArrowRight className="h-5 w-5 ml-3" />
                            </button>
                        </div>
                    )}
                </section>
            )}

            {currentSection === 'view' && (resumeData || scholarData) && (
                <section className="space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-gray-900">Your Academic Profile</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Review your profile information before generating project suggestions.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {resumeData && (
                            <div className="bg-white rounded-2xl  shadow-xl border border-gray-100 overflow-hidden">
                                <div className="bg-gradient-to-r  from-blue-600 to-purple-600 p-6 text-white">
                                    <div className="flex items-center space-x-3">
                                        <FileCheck className="h-8 w-8" />
                                        <div>
                                            <h2 className="text-2xl font-bold">Resume Analysis</h2>
                                            <p className="text-blue-100">Your profile has been successfully parsed</p>
                                        </div>
                                    </div>
                                </div>
                                    <ParsedResumeView />
                            </div>
                        )}

                        {scholarData && (
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-t-2xl">
                                    <h3 className="text-xl font-bold text-white flex items-center">
                                        <BookOpen className="h-6 w-6 mr-3" />
                                        Scholar Profile
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <ScholarProfileView />
                                </div>
                            </div>
                        )}
                    </div>
                    {canGenerateSuggestions && (
                        <div className="text-center py-8">
                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 max-w-2xl mx-auto">
                                <div className="space-y-6">
                                    <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-fit mx-auto">
                                        <Lightbulb className="h-12 w-12 text-white" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            Ready for Project Suggestions?
                                        </h3>
                                        <p className="text-gray-600">
                                            Based on your profile, we`&apos`ll generate personalized project
                                            recommendations tailored to your expertise.
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleGenerateSuggestions}
                                        disabled={suggestionsLoading}
                                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none text-lg shadow-lg"
                                    >
                                        {suggestionsLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                Generating Suggestions...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="h-5 w-5 mr-3" />
                                                Generate Project Suggestions
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            )}
            {currentSection === 'suggestions' && suggestions?.length > 0 && (
                <section className="space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-gray-900">Your Project Suggestions</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Here are personalized project recommendations based on your academic profile.
                        </p>
                    </div>
                    <ProjectSuggestions />
                </section>
            )}
        </div>
    )
}
