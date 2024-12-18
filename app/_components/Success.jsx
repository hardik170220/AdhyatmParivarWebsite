"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';

const Success = () => {
   const router = useRouter();
  return (
    <div className="flex items-center w-screen justify-center min-h-screen  ">
      <div className="relative border border-t-2 bg-white rounded-lg shadow-lg p-8 max-w-xs text-center">
        {/* Icon positioned at the top center */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <FaCheckCircle size={80} className="text-greenish rounded-full p-1" />
        </div>
        <h2 className="text-2xl font-semibold mt-8">Thank You!</h2>
        <p className="text-gray-600 mt-2">Your details have been successfully submitted. Thanks!</p>
        <button onClick={()=>router.push("/")} className="mt-6 w-full bg-greenish text-white px-4 py-2 rounded hover:bg-green-600">
          OK
        </button>
      </div>
    </div>
  );
};
export default Success