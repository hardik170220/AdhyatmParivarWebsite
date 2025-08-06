"use client"
import { useRouter } from 'next/navigation';
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
        <h2 className="text-2xl font-semibold mt-8">Thanks.</h2>
        <p className="text-gray-600 mt-2">You have successfully register for Adhyatm Parivar Member..</p>
        
        {/* Gujarati text notice with styled container */}
       
        
        <button 
          onClick={() => router.push("/")} 
          className="mt-6 w-full bg-greenish text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default Success;