import Providers from '@/app/providers'
import React from 'react'

const Page = () => {
  return (
    <Providers>
      {/* Large Screen - Single Image */}
      <div className="sm:py-6 pl-[2.2rem] sm:pl-[4.6rem]">
        <div className="flex justify-start items-center">
          <span className="text-base text-gray-800 sm:text-lg font-semibold font-Teko mr-4">
          अध्यात्म विभाग
          </span>
          <div>
            <img className="h-4" src="/next.png" alt="" />
          </div>
          <span className="text-gray-600 font-semibold font-Teko text-base sm:text-lg ml-4">
          धर्मानुष्ठान सुशोभन सामग्री की उपलब्धि
          </span>
        </div>
        <hr className="w-full border-t-2" />
      </div>
      <div className="hidden lg:flex flex-col  w-full h-full">
      <div>
          <img 
            src="/4/4.6.jpg" 
            alt="Small screen image 1"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Small Screen - Three Images in Column */}
      <div className="lg:hidden w-full space-y-4 p-4">
        <div>
          <img 
            src="/4/4.6-2.jpg" 
            alt="Small screen image 1"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/4/4.6-1.jpg" 
            alt="Small screen image 3"
            className="w-full h-auto"
          />
        </div>
      </div>
    </Providers>
  )
}

export default Page