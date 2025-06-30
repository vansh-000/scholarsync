import { Upload, BookOpen, Target, CheckCircle2, StepIcon } from 'lucide-react';
import React from 'react'

export default function Hero({resumeData,scholarData,suggestions,activeStep,setActiveStep}) {

    const steps = [
      {
        id: 1,
        title: 'Upload Data',
        description: 'Upload your resume and connect Scholar profile',
        completed: !!(resumeData || scholarData),
        icon: Upload,
      },
      {
        id: 2,
        title: 'Review Profile',
        description: 'Review and verify your academic profile',
        completed: !!(resumeData && scholarData),
        icon: BookOpen,
      },
      {
        id: 3,
        title: 'Get Suggestions',
        description: 'Receive personalized project recommendations',
        completed: !!suggestions?.length,
        icon: Target,
      },
    ];
  return (
    <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Your Journey to Success
          </h2>
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = activeStep === step.id;
              const isCompleted = step.completed;
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div
                      className={`relative flex items-center justify-center w-20 h-20 rounded-full border-4 transition-all duration-300 cursor-pointer shadow-lg ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white shadow-green-200'
                          : isActive
                          ? 'bg-blue-500 border-blue-500 text-white shadow-blue-200'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}
                      onClick={() => setActiveStep(step.id)}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-10 w-10" />
                      ) : (
                        <StepIcon className="h-10 w-10" />
                      )}
                    </div>
                    <div className="text-center max-w-40">
                      <p
                        className={`font-bold text-base ${
                          isCompleted
                            ? 'text-green-600'
                            : isActive
                            ? 'text-blue-600'
                            : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 bg-gray-300 mx-8 hidden sm:block">
                      <div
                        className={`h-full transition-all duration-500 ${
                          steps[index + 1].completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                        style={{ width: steps[index + 1].completed ? '100%' : '0%' }}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
  )
}
