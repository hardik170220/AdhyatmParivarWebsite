"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';

const Success = () => {
  const router = useRouter();
  return (
    <div className="flex items-center w-screen font-Anek justify-center min-h-screen bg-gray-50">
      <div className="relative border border-t-2 bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        {/* Icon positioned at the top center */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <FaCheckCircle size={80} className="text-greenish bg-white rounded-full p-1" />
        </div>
        <h2 className="text-2xl font-semibold mt-8">ધન્યવાદ !</h2>
        <p className="text-gray-600 mt-2">તમારુ ફોર્મ અમને ખુબ જ સારી રીતે મળી ગયું છે. <br /> આભાર ! </p>
        
        {/* Gujarati text notice with styled container */}
        <div className="mt-6 text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-800 font-medium text-center text-base" lang="gu">
            આત્માર્થી જ્ઞાનપિપાસુ વાચકો...
          </p>
          <p className="text-gray-700  text-sm mt-2 " lang="gu">
            પ્રસ્તુત પ્રવચન પુસ્તક અંગે <br /> આપની અને આપના જેવા અનેક વાચકોની ઈચ્છા અમોએ જાણી. પરંતૂ, <br /> નકલો પૂર્ણ થઈ ગઈ હોવાથી,<br /> હાલ તો નહીં પણ <br /> નવી આવૃત્તિ થતા અથવા <br /> અન્યવાચક પાસેથી પુસ્તક પરત આવતા <br /> વહેલામાં વહેલી તકે આપને <br /> પહોંચાડવાની જવાબદારી અમે અચૂક નિભાવશું...
          </p>
          <p className="text-gray-700 text-sm mt-2  font-medium" lang="gu">
            આપ નિશ્ચિંત રહેજો... <br />આપની પિપાસા સંતોષવી એ જ અમારો જીવનમંત્ર છે.
          </p>
        </div>
        
        <button 
          onClick={() => router.push("/")} 
          className="mt-6 w-full bg-greenish text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Success;