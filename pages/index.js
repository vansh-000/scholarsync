import React, { useState } from 'react';
import { useSelector} from 'react-redux';

import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProfileFlow from '@/components/ProfileFlow';

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(1);
  const [currentSection, setCurrentSection] = useState('upload');

  const { parsedData: resumeData } = useSelector(state => state.resume);
  const { profileData: scholarData } = useSelector(state => state.scholar);
  const { suggestions, loading: suggestionsLoading } = useSelector(state => state.suggestions);

  return (
    <div className="min-h-screen text-black bg-gray-50">
      <Header setCurrentSection={setCurrentSection} currentSection={currentSection} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Hero
          resumeData={resumeData}
          scholarData={scholarData}
          suggestions={suggestions}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        <ProfileFlow resumeData={resumeData}
          scholarData={scholarData}
          suggestions={suggestions}
          suggestionsLoading={suggestionsLoading} currentSection={currentSection} setCurrentSection={setCurrentSection} />
      </div>
      <Footer />
    </div>
  );
}
