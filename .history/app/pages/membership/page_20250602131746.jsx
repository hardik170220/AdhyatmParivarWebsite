"use client"
import React, { useState } from 'react';
import { 
  FaCheck, 
  FaUser, 
  FaIdCard, 
  FaPrayingHands 
} from 'react-icons/fa';

// Import the form components
import PersonalDetailsForm from '../../_components/formui/PersonalDetailsForm';
import ServicesSelectionForm from '../../_components/formui/ServicesSelectionForm';
import DikshitDetailsForm from '../../_components/formui/DikshitDetailsForm';

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personal: {},
    services: {},
    dikshit: {}
  });

  // Step definitions with icons
  const steps = [
    { id: 1, title: "Self-Detail", icon: <FaUser className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { id: 2, title: "Membership-Detail", icon: <FaIdCard className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { id: 3, title: "Dikshit-Detail", icon: <FaPrayingHands className="h-4 w-4 sm:h-5 sm:w-5" /> }
  ];

  // Handle form data changes for any step
  const updateFormData = (step, data) => {
    setFormData(prevData => ({
      ...prevData,
      [step]: {
        ...prevData[step],
        ...data
      }
    }));
  };

  // Handle next step navigation
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle previous step navigation
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle final form submission
  const handleSubmit = () => {
    console.log("Complete form data:", formData);
    // Here you would submit the data to your backend
    alert("Registration completed successfully!");
  };

  // Helper function to determine step status
  const getStepStatus = (stepId) => {
    if (currentStep > stepId) return "completed";
    if (currentStep === stepId) return "current";
    return "upcoming";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b font-Karma from-indigo-50 to-white py-8 px-2 sm:px-6 lg:px-8">
      <div className=" w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 font-Teko font-sans">Register as Member</h1>
          <p className="mt-2 text-base text-gray-700">Join Adhyatm Parivar and contribute your services</p>
          <div className="h-1 w-20 bg-gray-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Step Indicator */}
        <div className="mb-8 relative">
          <div className="flex items-center justify-center">
            {steps.map((step, i) => (
              <React.Fragment key={step.id}>
                {/* Step Circle */}
                <div className='flex flex-col items-center justify-center gap-2'>
                <div 
                  className={`flex items-center justify-center rounded-full h-8 w-8 sm:h-10 sm:w-10 border-2 transition-all duration-300 shadow-md
                    ${getStepStatus(step.id) === "completed" ? 'bg-green-600 border-green-600 text-white' : 
                      getStepStatus(step.id) === "current" ? 'bg-white border-gray-600 text-gray-600' : 
                      'bg-white border-gray-300 text-gray-400'}`}
                >
                  {getStepStatus(step.id) === "completed" ? (
                    <FaCheck className="h-4 w-4 sm:h-6 sm:w-6" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div 
                key={step.id} 
                className={`text-center ${getStepStatus(step.id) !== "upcoming" ? 'text-gray-700 font-medium' : 'text-gray-500'}`}
                
              >
                <span className="text-sm sm:text-lg font-Teko">{step.title}</span>
              </div>
                </div>
                
                {/* Connector Line */}
                {i < steps.length - 1 && (
                  <div className="flex-1 -mt-6 h-1 mx-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gray-600 transition-all duration-500" 
                      style={{width: getStepStatus(step.id) === "completed" ? '100%' : '0%'}}
                    ></div>
                  </div>
                )}
              </React.Fragment>
            ))}
            
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white sm:w-[60vw] shadow-lg rounded-xl mb-8 border border-indigo-100 transform transition-all duration-300">
          <div className="mb-6 p-3 bg-gray-800 border-b  border-gray-300">
            <h2 className="text-xl font-Teko font-medium text-gray-200 flex items-center">
              {steps[currentStep-1].icon}
              <span className="ml-3">{steps[currentStep-1].title.toUpperCase()}</span>
            </h2>
          </div>
          
          {currentStep === 1 && (
            <PersonalDetailsForm 
              formData={formData.personal}
              updateFormData={(data) => updateFormData('personal', data)}
              nextStep={nextStep}
            />
          )}
          
          {currentStep === 2 && (
            <ServicesSelectionForm 
              formData={formData.services}
              updateFormData={(data) => updateFormData('services', data)}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          
          {currentStep === 3 && (
            <DikshitDetailsForm 
              formData={formData.dikshit}
              updateFormData={(data) => updateFormData('dikshit', data)}
              prevStep={prevStep}
              handleRegister={handleSubmit}
            />
          )}
        </div>

        {/* Progress indicator */}
        <div className="mt-6 mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gray-800 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-right mt-2 text-sm text-gray-600 font-medium">
            {Math.round((currentStep / steps.length) * 100)}% Complete
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;